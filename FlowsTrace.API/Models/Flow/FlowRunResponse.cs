using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlowsTrace.API.Models.Flow
{
    public class FlowRunResponse
    {
        public string name { get; set; }
        public string id { get; set; }
        public string type { get; set; }
        public Properties properties { get; set; }
        public bool isMigrationSource { get; set; }
    }

    public class CustomAction
    {
        public Inputslink inputsLink { get; set; }
        public Outputslink outputsLink { get; set; }
        public DateTime startTime { get; set; }
        public DateTime endTime { get; set; }
        public Correlation correlation { get; set; }
        public string status { get; set; }
        public string code { get; set; }
    }

    public class FlowResponse
    {
        public string id { get; set; }
        public string type { get; set; }
        public PropertiesRunResponse properties { get; set; }
    }

    public class PropertiesRunResponse
    {
        public string apiId { get; set; }
        public string displayName { get; set; }
        public string userType { get; set; }
        public Definition definition { get; set; }
        public string sharingType { get; set; }
        public Connectionreferences connectionReferences { get; set; }
        public DateTime createdTime { get; set; }
        public DateTime lastModifiedTime { get; set; }
        public string flowSuspensionReason { get; set; }
        public Environment environment { get; set; }
        public Definitionsummary definitionSummary { get; set; }
        public string provisioningMethod { get; set; }
        public bool flowFailureAlertSubscribed { get; set; }
        public string workflowEntityId { get; set; }
        public bool isManaged { get; set; }
        public Machinedescriptiondata machineDescriptionData { get; set; }
        public Flowopenaidata flowOpenAiData { get; set; }
    }

    public class Definition
    {
        public DefinitionMetadata metadata { get; set; }
        public string schema { get; set; }
        public string contentVersion { get; set; }
        public Parameters parameters { get; set; }
        public Triggers triggers { get; set; }
        public DefinitionActions actions { get; set; }
    }

    public class DefinitionMetadata
    {
        public string workflowEntityId { get; set; }
        public object processAdvisorMetadata { get; set; }
        public object flowChargedByPaygo { get; set; }
        public string flowclientsuspensionreason { get; set; }
        public object flowclientsuspensiontime { get; set; }
        public object flowclientsuspensionreasondetails { get; set; }
        public Creator creator { get; set; }
        public string provisioningMethod { get; set; }
        public bool failureAlertSubscription { get; set; }
        public DateTime clientLastModifiedTime { get; set; }
        public DateTime connectionKeySavedTimeKey { get; set; }
        public object creationSource { get; set; }
    }

    public class Creator
    {
        public string id { get; set; }
        public string type { get; set; }
        public string tenantId { get; set; }
    }

    public class Parameters
    {
        public Connections connections { get; set; }
        public Authentication authentication { get; set; }
    }

    public class Connections
    {
        public Defaultvalue defaultValue { get; set; }
        public string type { get; set; }
    }

    public class Authentication
    {
        public Defaultvalue defaultValue { get; set; }
        public string type { get; set; }
    }

    public class Triggers
    {
        public Cuando_Se_Agrega_Modifica_O_Elimina_Una_Fila Cuando_se_agrega_modifica_o_elimina_una_fila { get; set; }
    }

    public class Cuando_Se_Agrega_Modifica_O_Elimina_Una_Fila
    {
        public DefinitionMetadata metadata { get; set; }
        public string type { get; set; }
        public Inputs inputs { get; set; }
    }
    
    public class Inputs
    {
        public Host host { get; set; }
        public InputsParameters parameters { get; set; }
        public string authentication { get; set; }
    }

    public class Host
    {
        public string apiId { get; set; }
        public string connectionName { get; set; }
        public string operationId { get; set; }
    }

    public class InputsParameters
    {
        public int subscriptionRequestmessage { get; set; }
        public string subscriptionRequestentityname { get; set; }
        public int subscriptionRequestscope { get; set; }
        public string subscriptionRequestfilteringattributes { get; set; }
        public string subscriptionRequestname { get; set; }
    }

    public class DefinitionActions
    {
        public ActionsCondición Condición { get; set; }
    }

    public class ActionsCondición
    {
        public ActionsCustomAction actions { get; set; }
        public Runafter runAfter { get; set; }
        public Expression expression { get; set; }
        public DefinitionMetadata metadata { get; set; }
        public string type { get; set; }
    }

    public class ActionsCustomAction
    {
        public CustomActionProperties Actualizar_contacto { get; set; }
    }

    public class CustomActionProperties
    {
        public Runafter runAfter { get; set; }
        public DefinitionMetadata metadata { get; set; }
        public string type { get; set; }
        public Inputs inputs { get; set; }
    }

    public class Expression
    {
        public object[] equals { get; set; }
    }

    public class Connectionreferences
    {
        public Shared_Commondataserviceforapps shared_commondataserviceforapps { get; set; }
    }

    public class Shared_Commondataserviceforapps
    {
        public string connectionName { get; set; }
        public string connectionReferenceLogicalName { get; set; }
        public string source { get; set; }
        public Impersonation impersonation { get; set; }
        public string id { get; set; }
        public string displayName { get; set; }
        public string iconUri { get; set; }
        public string brandColor { get; set; }
        public string tier { get; set; }
        public string apiName { get; set; }
    }

    public class Impersonation
    {
        public string objectId { get; set; }
    }

    public class Environment
    {
        public string name { get; set; }
        public string type { get; set; }
        public string id { get; set; }
    }

    public class Definitionsummary
    {
        public TriggerRunResponse[] triggers { get; set; }
        public Action[] actions { get; set; }
    }

    public class TriggerRunResponse
    {
        public string type { get; set; }
        public string swaggerOperationId { get; set; }
        public DefinitionMetadata metadata { get; set; }
        public Api api { get; set; }
    }

    public class Api
    {
        public string name { get; set; }
        public string id { get; set; }
        public string type { get; set; }
        public ApiProperties properties { get; set; }
    }

    public class ApiProperties
    {
        public string displayName { get; set; }
        public string iconUri { get; set; }
        public ApiPropertiesMetadata metadata { get; set; }
        public string tier { get; set; }
        public bool isCustomApi { get; set; }
        public string description { get; set; }
    }

    public class ApiPropertiesMetadata
    {
        public string source { get; set; }
        public string brandColor { get; set; }
        public string useNewApimVersion { get; set; }
        public Version version { get; set; }
    }

    public class Version
    {
        public string previous { get; set; }
        public string current { get; set; }
    }

    public class Action
    {
        public string type { get; set; }
        public DefinitionMetadata metadata { get; set; }
        public string swaggerOperationId { get; set; }
        public Api api { get; set; }
    }

    public class Machinedescriptiondata
    {
    }

    public class Flowopenaidata
    {
        public bool isConsequential { get; set; }
        public bool isConsequentialFlagOverwritten { get; set; }
    }
}
