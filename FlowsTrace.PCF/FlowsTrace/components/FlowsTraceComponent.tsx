import * as React from 'react';
import { useEffect } from 'react';

import { Combobox, FluentProvider, Label, makeStyles, Table, TableBody, TableCell, TableCellLayout, TableHeader, TableHeaderCell, TableRow, webLightTheme, Option, Button, Badge, ProgressBar, Field} from '@fluentui/react-components';
import { IDataFlowTraceResponse, IDataResponse, IFlowsTraceComponent } from '../models/Interfaces';
import { useMediaQuery } from 'react-responsive';
import { getFlows, getFlowsTrace } from '../services/CRMService';
import { HeartPulseErrorRegular, OpenRegular, SlideSearchRegular } from "@fluentui/react-icons";
import { translations } from '../models/Translations';
import { FilterExecutions } from '../models/Enums';


const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: "block", margin: "0px", padding: "0px",
  },
  loading:{
    paddingTop: "20px", textAlign: "center", width: "100%",
  },
  show:{
    display: "block", visibility: "visible", width: "100%"
  },
  hide:{
    display: "none", visibility: "hidden"
  },
  header:{
    display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", marginTop: "16px"
  },
  headerLeft:{
    display: "flex", alignItems: "center", gap: "8px", 
  },
  headerRight:{
    textAlign: "right",
  },
  footer:{
    display: "flex", margin: "0 auto", justifyContent: "space-between", alignItems: "center"
  },
  footerRight:{
    textAlign: "right"
  },
  noCaret: {
    userSelect: "none", caretColor: "transparent",
  },
  alignRight:{
    right: "0px",
  },
  textSmall:{
    fontSize: "12px", fontWeight: "400",
  },
  alignCenter:{
    margin: "0 auto", textAlign: "center",
  },
  table:{
    minWidth: "510px", marginBottom: "16px"
  },
  pointer:{
    cursor: "pointer",
  },
  groupBackground1: {
    backgroundColor: "rgba(0, 120, 212, 0.50)", // Light blue background
  },
  groupBackground2: {
    backgroundColor: "rgba(255, 255, 255, 0)", // Default/transparent background
  }
});


export const FlowsTraceComponent : React.FunctionComponent<IFlowsTraceComponent> = (props) => {  
  const style = useStyles();

  // Mapping languageId to the corresponding language code in Translations.tsx
  const languageMap: { [key: number]: string } = {
    1026: "bg", 1027: "ca", 1028: "zh", 1029: "cs", 1030: "da", 1031: "de", 
    1032: "el", 1033: "en", 1034: "es", 1035: "fi", 1036: "fr", 1038: "hu",
    1039: "is", 1040: "it", 1041: "ja", 1042: "ko", 1043: "nl", 1044: "nb",
    1045: "pl", 1046: "pt", 1048: "ro", 1049: "ru", 1050: "hr", 1051: "sk",
    1052: "sq", 1053: "sv", 1054: "th", 1055: "tr", 1058: "uk", 1060: "sl",
    1061: "et", 1062: "lv", 1063: "lt", 1066: "vi", 1071: "mk", 2074: "sr",
    3082: "es", 5146: "bs",
  };
  
  const currentLanguage = (languageMap[props.userSettings.languageId] || "en") as keyof typeof translations;
  const translation = translations[currentLanguage]; // Shortcut for easier access
  
  const messagesLoading = [
    "Validating flows...",
    "Verifying actions in flows...",
    "Verifying record in flows...",
  ];

  const isLaptop = useMediaQuery({ query: '(min-width: 1024px) and (max-width: 1279px)' });
  const isMonitor = useMediaQuery({ query: '(min-width: 1280px) and (max-width: 1919px)' });
  const isPanonamic = useMediaQuery({ query: '(min-width: 1920px)' });

  const [loading, setLoading] = React.useState(true);
  const [flows, setFlows] = React.useState<IDataResponse>();
  const [flowsTrace, setFlowsTrace] = React.useState<IDataFlowTraceResponse>();

  const [recordsPerPage, setRecordsPerPage] = React.useState(10); // Default to 10 records per page
  const [filterExecution, setFilterExecution] = React.useState<FilterExecutions>(FilterExecutions.LastHour); // Default to LastHour
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortColumn, setSortColumn] = React.useState<string | null>("DateExecution"); // Default to DateExecution
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("desc");// Default to descending order
  const [sortFieldType, setSortFieldType] = React.useState<"string" | "date" | "number">("string");
  const [loadingMessage, setLoadingMessage] = React.useState(messagesLoading[0]); // Default message
  const [loadingMessageStatus, setLoadingMessageStatus] = React.useState<"none" | "error" | "warning" | "success">("none"); // Default message
  const [loadingMessageProgressBar, setLoadingMessageProgressBar] = React.useState<"error" | "warning" | "success">(); // Default message


  const actionStatusMapping = {
    0: { label: translation.flowStatusEnums.failed, color: "important" },
    1: { label: translation.flowStatusEnums.succeeded, color: "success" },
    2: { label: translation.flowStatusEnums.cancelled, color: "informative" },
    default: { label: translation.flowStatusEnums.unknown, color: "subtle" },
  };
  
  const statusMapping = {
    0: { label: translation.flowStatusEnums.failed, color: "important" },
    1: { label: translation.flowStatusEnums.succeeded, color: "success" },
    2: { label: translation.flowStatusEnums.cancelled, color: "informative" },
    default: { label: translation.flowStatusEnums.unknown, color: "subtle" },
  };
 
  const LoadFlows = async (filterExecution : FilterExecutions) => {
    let flowsResponse : IDataFlowTraceResponse = { error: true, message: "", data: [] };
    try{
      flowsResponse = await getFlowsTrace(props.webAPI, props.recordId, filterExecution)
    }catch(error){
      console.error(error);
    }
    return flowsResponse;
  } 

  var intervalmessagesLoading : any; 
  
  const setSuccessLoading = () => {
    setLoading(false);
    clearInterval(intervalmessagesLoading);    
  }

  const setErrorLoading = () => {
    clearInterval(intervalmessagesLoading);  
    setLoadingMessage("Error loading flows"); // Set error message  
    setLoadingMessageStatus('error');
    setLoadingMessageProgressBar('error');
    setLoading(true);
  }

  // Helper function to parse date strings correctly
  const parseDate = React.useCallback((dateValue: any): Date => {
    if (dateValue instanceof Date) {
      return dateValue;
    }
    
    if (dateValue === null || dateValue === undefined) {
      console.warn('Null/undefined date value, using current date');
      return new Date();
    }
    
    const dateStr = String(dateValue).trim();
    
    if (!dateStr) {
      console.warn('Empty date string, using current date');
      return new Date();
    }
    
    // Try parsing as ISO date string (e.g., "2025-09-24T14:05:46.8629359Z")
    try {
      const parsedDate = new Date(dateStr);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
      }
    } catch (error) {
      console.warn('Error parsing ISO date:', dateStr, error);
    }
    
    // Handle DD/MM/YYYY HH:mm:ss format as fallback (in case data comes formatted)
    const ddmmyyyyRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{1,2}):(\d{1,2})$/;
    const match = dateStr.match(ddmmyyyyRegex);
    
    if (match) {
      try {
        const [, day, month, year, hour, minute, second] = match;
        // Month is 0-indexed in JavaScript Date constructor
        const result = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 
                        parseInt(hour), parseInt(minute), parseInt(second));
        if (!isNaN(result.getTime())) {
          return result;
        }
      } catch (error) {
        console.warn('Error parsing DD/MM/YYYY format:', dateStr, error);
      }
    }
    
    // If all else fails, return current date to avoid breaking the sort
    console.warn('Could not parse date:', dateValue, 'using current date as fallback');
    return new Date();
  }, []);
  
  // Sorting logic - sort first, then paginate
  const sortedData = React.useMemo(() => {
    if (!flowsTrace?.data || flowsTrace.data.length === 0) return [];
    
    // If no sort column specified, return data as-is
    if (!sortColumn) return flowsTrace.data;

    const sorted = [...flowsTrace.data].sort((a, b) => {
      let aValue = a[sortColumn as keyof typeof a];
      let bValue = b[sortColumn as keyof typeof b];

      // Handle different field types
      if (sortFieldType === "date") {
        // Use the helper function to parse dates correctly
        const aDate = parseDate(aValue);
        const bDate = parseDate(bValue);
        
        // Compare using getTime() for more reliable date comparison
        const aTime = aDate.getTime();
        const bTime = bDate.getTime();
        
        if (aTime < bTime) return sortDirection === "asc" ? -1 : 1;
        if (aTime > bTime) return sortDirection === "asc" ? 1 : -1;
        return 0;
      } else if (sortFieldType === "number") {
        // Convert to numbers for proper numerical comparison
        aValue = Number(aValue) as any;
        bValue = Number(bValue) as any;
      }
      // For "string" type, use default comparison

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    
    if (sortFieldType === "date" && sorted.length > 0) {
      sorted.slice(0, 3).map(item => ({
        original: item[sortColumn as keyof typeof item],
        parsed: parseDate(item[sortColumn as keyof typeof item]).toISOString()
      }));
    }

    return sorted;
  }, [sortColumn, sortDirection, sortFieldType, flowsTrace?.data, parseDate]);

  const handleNextPage = () => {
    if (sortedData && currentPage * recordsPerPage < sortedData.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  
  // Paginate the sorted data with useMemo for better control
  const paginatedData = React.useMemo(() => {
    if (!sortedData) return [];
    
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = currentPage * recordsPerPage;
    const result = sortedData.slice(startIndex, endIndex);
    
    // Debug log for paginatedData
    if (result.length > 0 && sortColumn === "DateExecution") {
      result.forEach((item, index) => {
        const parsedDate = parseDate(item.DateExecution);
        const formattedForUI = new Intl.DateTimeFormat("es-ES", {
          year: "numeric", month: "2-digit", day: "2-digit",
          hour: "2-digit", minute: "2-digit", second: "2-digit",
          hour12: false,
        }).format(parsedDate).replace(",", "");
      });
    }
    
    return result;
  }, [sortedData, currentPage, recordsPerPage, sortColumn, parseDate]);

  // Group rows by RunName for alternating background colors
  const getRowBackgroundStyle = React.useMemo(() => {
    if (!paginatedData || paginatedData.length === 0) {
      return () => ({});
    }
    
    // Count occurrences of each RunName in current page
    const runNameCounts: { [key: string]: number } = {};
    paginatedData.forEach(flow => {
      runNameCounts[flow.RunName] = (runNameCounts[flow.RunName] || 0) + 1;
    });
    
    // Get unique RunNames that appear more than once (need grouping)
    const duplicateRunNames = Object.keys(runNameCounts)
      .filter(runName => runNameCounts[runName] > 1)
      .sort();
    
    // Assign alternating colors to duplicate RunNames using inline styles
    const runNameStyles: { [key: string]: React.CSSProperties } = {};
    duplicateRunNames.forEach((runName, index) => {
      runNameStyles[runName] = {
        backgroundColor: index % 2 === 0 ? "rgba(0, 120, 212, 0.50)" : "rgba(255, 193, 7, 0.30)"
      };
    });
    
    return (runName: string) => {
      return runNameStyles[runName] || {};
    };
  }, [paginatedData]);

  // Handle column header click
  const handleSort = (column: string, fieldType: "string" | "date" | "number" = "string") => {
    if (sortColumn === column) {
      // Toggle sort direction if the same column is clicked
      setSortDirection((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
    } else {
      // Set new column and default to ascending order
      setSortColumn(column);
      setSortDirection("asc");
    }
    // Always update the field type
    setSortFieldType(fieldType);
    // Reset to first page when sorting changes
    setCurrentPage(1);
  };

  const initIntervalMessagesLoading = () => {
    let indexMessagesLoading = 0;
    intervalmessagesLoading = setInterval(() => {
      indexMessagesLoading = (indexMessagesLoading + 1) % messagesLoading.length; // Cycle through messages
      setLoadingMessage(messagesLoading[indexMessagesLoading]);
    }, 2000); // Change message every 2 seconds
  }

  const OnClickFilterExecution = (value : FilterExecutions) => {
    setFilterExecution(value)
    setLoadingMessageStatus('none');
    initIntervalMessagesLoading(); // Start loading messages
    setLoadingMessage(messagesLoading[0]); // Reset loading message
    setLoading(true); // Show loading indicator
    setCurrentPage(1); // Reset to first page
    
    setSortColumn("DateExecution"); // Reset sort column
    setSortDirection("desc"); // Reset sort direction
    setSortFieldType("string"); // Reset sort field type

    LoadFlows(value).then((flowsResponse) => {
      setFlowsTrace(flowsResponse); 
      setSuccessLoading();
    })
  }

  useEffect(() => {    
    try{   
      initIntervalMessagesLoading(); // Start loading messages

      LoadFlows(filterExecution).then((flowsResponse) => {
        setFlowsTrace(flowsResponse); 
        setSuccessLoading();
      })

      // Cleanup interval on component unmount
      return () => clearInterval(intervalmessagesLoading);
    }catch(error){
      setErrorLoading();
      console.error(error);
    }
  }, []);

  return (
    <FluentProvider theme={webLightTheme} style={{height: "100%", width: "100%"}}>
      <div className={loading ? (style.show, style.loading) : style.hide}>
        <Field className={style.noCaret} validationMessage={loadingMessage} validationState={loadingMessageStatus} >
          {loadingMessageStatus == 'none' ? <ProgressBar/> : <ProgressBar value={1}/>}
        </Field>
      </div> 
      <div className={loading ? style.hide : style.root}>
        <h2 className={style.noCaret}>Flows Trace</h2>
        <div className={style.header}>
          <div className={style.headerLeft}>  
              <label  className={[style.noCaret, style.pointer].join(" ")} htmlFor="recordsPerPage">{translation.recordsPerPage}</label>&nbsp;
              <Combobox
                id="recordsPerPage"
                placeholder={translation.recordsPerPage}
                value={recordsPerPage.toString()} 
                freeform={false}
                readOnly={true}
                className={[style.noCaret, style.pointer].join(" ")}
                onOptionSelect={(event, data) => (setRecordsPerPage(Number(data.optionValue)), setCurrentPage(1))} // Reset to first page on change
              >
                <Option value="5">5</Option>
                <Option value="10">10</Option>
                <Option value="50">50</Option>
                <Option value="100">100</Option>
              </Combobox>           
          </div>
          <div className={style.headerRight}>
            <label className={[style.noCaret, style.pointer].join(" ")} htmlFor="filterExecution">{translation.filterExecutions}</label>&nbsp;
            <Combobox
              id="filterExecution"
              placeholder={translation.filterExecutions}
              value={translation.filterExecutionEnums[filterExecution as keyof typeof translation.filterExecutionEnums]}
              freeform={false}
              readOnly={true}
              className={[style.noCaret, style.pointer].join(" ")}
              onOptionSelect={(event, data) => OnClickFilterExecution(data.optionValue as FilterExecutions)}
            >
              {Object.values(FilterExecutions).map((value) => (
                <Option key={value.toString()} value={value.toString()}>
                  {translation.filterExecutionEnums[value as keyof typeof translation.filterExecutionEnums]}
                </Option>
              ))}
            </Combobox>     
          </div>
        </div>
        {flowsTrace && paginatedData && paginatedData.length > 0 && (
          <>
          <Table aria-label="Flows Trace Table" style={{ minWidth: "510px", marginBottom: "16px" }} className={[style.noCaret].join(" ")}>
            <TableHeader>
              <TableRow>
                <TableHeaderCell className={style.noCaret} style={{ width: "260px", cursor: "pointer" }} onClick={() => handleSort("RunName", "string")}>Id {sortColumn === "RunName" && (sortDirection === "asc" ? "▲" : "▼")}</TableHeaderCell>
                <TableHeaderCell className={style.noCaret} style={{ width: "150px", cursor: "pointer" }} onClick={() => handleSort("DateExecution", "date")}>{translation.date} {sortColumn === "DateExecution" && (sortDirection === "asc" ? "▲" : "▼")}</TableHeaderCell>
                <TableHeaderCell className={style.noCaret} style={{ width: "120px", cursor: "pointer" }} onClick={() => handleSort("Status", "number")}>{translation.flowStatus} {sortColumn === "Status" && (sortDirection === "asc" ? "▲" : "▼")}</TableHeaderCell>
                <TableHeaderCell className={style.noCaret} style={{ width: "auto", cursor: "pointer" }} onClick={() => handleSort("Name", "string")}>{translation.flowName} {sortColumn === "Name" && (sortDirection === "asc" ? "▲" : "▼")}</TableHeaderCell>
                <TableHeaderCell className={style.noCaret} style={{ width: "120px", cursor: "pointer" }} onClick={() => handleSort("ActionStatus", "string")}>{translation.actionStatus} {sortColumn === "ActionStatus" && (sortDirection === "asc" ? "▲" : "▼")}</TableHeaderCell>
                <TableHeaderCell className={style.noCaret} style={{ width: "auto", cursor: "pointer" }} onClick={() => handleSort("Action", "string")}>{translation.action} {sortColumn === "Action" && (sortDirection === "asc" ? "▲" : "▼")}</TableHeaderCell>                
                <TableHeaderCell className={style.noCaret} style={{ width: "100px" }}>{translation.showExecution}</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(paginatedData ?? []).map((flow) => (
                <TableRow key={flow.Id_+Math.random().toString(36).substring(2, 15)} style={getRowBackgroundStyle(flow.RunName)}>
                  <TableCell>
                    <TableCellLayout className={style.noCaret}>{flow.RunName}</TableCellLayout>
                  </TableCell>
                  <TableCell>
                    <TableCellLayout className={style.noCaret}>
                      {
                        new Intl.DateTimeFormat(props.userSettings.languageId === 1033 ? "en-US" : "es-ES",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: false,
                        }
                      ).format(new Date(flow.DateExecution)).replace(",", "")}
                    </TableCellLayout>
                  </TableCell>
                  <TableCell>
                    <TableCellLayout className={style.noCaret}>
                      <Badge
                        appearance="filled"
                        shape="rounded"
                        color={
                          (statusMapping[flow.Status as keyof typeof statusMapping]?.color ||
                            statusMapping.default.color) as
                            | "important"
                            | "success"
                            | "informative"
                            | "subtle"
                            | "brand"
                            | "danger"
                            | "severe"
                            | "warning"
                            | undefined
                        }
                      >
                        {statusMapping[flow.Status as keyof typeof statusMapping]?.label ||
                          statusMapping.default.label}
                      </Badge>
                    </TableCellLayout>
                  </TableCell>   
                  <TableCell>
                    <TableCellLayout className={style.noCaret}>{flow.Name}</TableCellLayout>
                  </TableCell>
                  <TableCell>
                    <TableCellLayout className={style.noCaret}>
                      {flow.Action !== null && flow.Action !== undefined ?
                      <Badge
                        appearance="filled"
                        shape="rounded"
                        color={
                          (actionStatusMapping[flow.ActionStatus as keyof typeof actionStatusMapping]?.color ||
                            actionStatusMapping.default.color) as
                            | "important"
                            | "success"
                            | "informative"
                            | "subtle"
                            | "brand"
                            | "danger"
                            | "severe"
                            | "warning"
                            | undefined
                        }
                      >
                        {actionStatusMapping[flow.ActionStatus as keyof typeof actionStatusMapping]?.label ||
                          actionStatusMapping.default.label}
                      </Badge>
                      : <></>
                      }
                    </TableCellLayout>
                  </TableCell>         
                  <TableCell>
                    <TableCellLayout className={style.noCaret}>{flow.Action}</TableCellLayout>
                  </TableCell>                  
                  <TableCell>
                    <TableCellLayout className={style.noCaret} onClick={() => window.open(flow.RunId, "_blank")} media={<OpenRegular style={{ cursor: "pointer" }} />}>
                    </TableCellLayout>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className={[style.noCaret, style.footer].join(" ")}>
            <div style={{display: "flex", gap: "16px", alignItems: "center",  margin: "0 auto"}}>
              <Button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                appearance="primary"
              >
                {'< '+translation.previous}
              </Button>
              <span>
                {translation.page} {currentPage} {translation.of}
                {Math.ceil((sortedData?.length || 0) / recordsPerPage)}
              </span>              
              <Button
                onClick={handleNextPage}
                disabled={
                  sortedData && currentPage * recordsPerPage >= sortedData.length
                }
                appearance="primary"
              >
                {translation.next + ' >'}
              </Button>
            </div>
            <div className={style.footerRight}>
              <span>{translation.totalExecutions}</span>&nbsp;<b>{flowsTrace?.data.length || 0}</b>
            </div>
          </div>
        </>
        )}
        {flowsTrace && flowsTrace.error ? (
          <div className={style.alignCenter}>
            <HeartPulseErrorRegular fontSize={60} />
            <p>{translation.errorLoadingFlows}</p>
          </div>
        ) : (sortedData && sortedData.length === 0 && (
          <div className={style.alignCenter}>
            <SlideSearchRegular fontSize={60} />
            <p>{translation.noFlows}</p>
          </div>
        ))}
      </div>
    </FluentProvider>
  )
}
