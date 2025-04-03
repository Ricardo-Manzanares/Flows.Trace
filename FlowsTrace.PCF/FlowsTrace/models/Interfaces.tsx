export interface IFlowsTraceComponent {
  webAPI: ComponentFramework.WebApi;
  recordId : string;
  userSettings: ComponentFramework.UserSettings;
}

export interface IDataResponse {
  value: any[];
  nextLink?: string;
  count?: number;
}


export interface IDataFlowTraceResponse{
  error: boolean;
  message: string;
  data: any[];
}