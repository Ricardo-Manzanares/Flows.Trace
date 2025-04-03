🚀 Flows Trace – Optimize the tracing of your flows in Power Platform! 🔍

💡 What is Flows Trace?
It's a powerful PCF tool designed to give you complete traceability of cloud flows in Power Automate, allowing you to accurately analyze every execution that affects a record in Dataverse.

✨Highlighted Features:
✅ Detailed tracing of executed flows, such as triggers or internal actions.
✅ Multilingual support with translation into 38 languages. 🌍
✅ Flexible pagination: Display 5, 10, 50, or 100 records per page.
✅ Advanced sorting: Filter executions in ascending or descending order by multiple columns.
✅ Quick access: Open and examine any execution within the Power Platform environment.
✅ History Optimization: Review runs up to a week ago, respecting the 28-day storage limit in Microsoft Flow.

🔗 Discover Flows Trace now and take your flow analysis to the next level!

**PCF Flows Trace**
---------------
#### Demo
![Vc0WgbdyZp](https://github.com/user-attachments/assets/f1115f8a-a75c-4376-965f-3b1ad7cfd3d5)

#### Captures
![msedge_HB4Oram0su](https://github.com/user-attachments/assets/0f5048c9-86a9-47f6-b172-51a2e2ee9af9)
![msedge_eHlhqFsF8K](https://github.com/user-attachments/assets/2852fa9b-7505-4c75-9285-473a205f5cf6)


**Installation**
---------------

- Download and install the Data Verse solution in your environment where you want to use the PCF.

[FlowsTrace_1_0_0_0.zip](https://github.com/user-attachments/files/19592593/FlowsTrace_1_0_0_0.zip)

**Connection Configuration**
---------------

- Configure the following environment variables for connecting the Custom API to the Flow API:
![image](https://github.com/user-attachments/assets/a803c371-f2bb-4cd2-94b7-2007c67edfd2)

**_The application user configured for the connection in the environment must have at least the following roles:_**
![image](https://github.com/user-attachments/assets/4b38e893-9098-4622-9584-04c3e1d7a16a)


**PCF Configuration**
---------------

- Add the control to a form for any entity for which you want to obtain the executions of an associated record.
![image](https://github.com/user-attachments/assets/72016468-862b-4254-a054-997cdb94285f)

**_You need to associate a property of a String field (TextField), such as the Record Name field or another field from the entity, to configure the control (no updates are made to this field in the PCF)._**

**Considerations for the Custom API**
---------------

The custom API reviews all unmanaged cloud flows to validate whether the entity record where the PCF is configured is associated as a trigger or used in a CRUD operation in any of the actions of each flow.

To improve performance, by default the PCF sends the review filter for executions from the last hour. You can change the filter within the PCF, keeping in mind that it will take longer to obtain a response.
