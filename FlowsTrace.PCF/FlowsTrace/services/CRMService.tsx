import * as React from 'react';
import PromisePool from '@supercharge/promise-pool';
import { IDataResponse } from '../models/Interfaces';
import { IInputs } from '../generated/ManifestTypes';

const concurrencyPromises = 30;

async function GetData(webAPI: any, entityName: string, options: string, nextLink?: string): Promise<IDataResponse> {
    let data: any[] = [];
    let totalRecords = 0;

    const fetchData = async (link?: string) => {
        const response = await webAPI.retrieveMultipleRecords(entityName, link ? link : options);
        data = data.concat(response.entities);
        totalRecords += response.entities.length;

        if (response.nextLink) {
            console.log("Get Data next link. Current records ", totalRecords);
            await fetchData(new URL(response.nextLink).search);
        }
    };

    await fetchData(nextLink);

    return { value: data, count: totalRecords };
}

export const getFlowsTrace = async (webAPI: ComponentFramework.WebApi, recordId : string, filterExecutions : string) => {  
    try {
        
        var flwsTraceRequest = new class {
 
            rmc_flowstracerequest = "{'record_id' : '"+recordId+"', 'filter_range_execution' : '"+filterExecutions+"'}";
         
            getMetadata(): any {
                return {
                    parameterTypes: {
         
                        rmc_flowstracerequest: {
                            typeName: "Edm.String",
                            structuralProperty: 1
                        }
                    },
                    operationType: 0,
                    operationName: "rmc_flowstrace"
                };
            }
        }();

        //The PCF context current has the execute on it but it's not included in the types        
        
        ///@ts-ignore        
        return await webAPI.execute(flwsTraceRequest).then(async (response: any) => {
            
            if (response.ok)           
            {           
                let data = await response.json();           
                return JSON.parse(data.rmc_flowstraceresponse);
            }else{            
                return '';           
            }        
        },        
        (error: any) => {        
            return null;        
        });        
    } 
    catch (error) {    
        return null;    
    } 
};

export const getFlows = async (webAPI: ComponentFramework.WebApi) => {  
    let flowsEntityResponse = await GetData(webAPI, "workflow", "?$select=workflowid,workflowidunique,clientdata,name,statecode,statuscode,ismanaged&$filter=(category eq 5)");
    let flowsResponse : IDataResponse = { value: [], count: 0 };
    if(flowsEntityResponse != undefined && flowsEntityResponse.count !== undefined && flowsEntityResponse.count > 0)
    {        
        flowsResponse.count = flowsEntityResponse.count;
        flowsEntityResponse.value.map((k : any)=> k).forEach(function(record, indexRecord){
            flowsResponse.value.push(record);
        });   
    }
    return flowsResponse;
};