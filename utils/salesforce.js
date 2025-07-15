const axios = require('axios');

async function fetchValidationRules(instanceUrl, accessToken, sobjectName) {
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    };

    // Step 1: Query ValidationRule records
    const listUrl = `${instanceUrl}/services/data/v55.0/tooling/query?q=` +
        `SELECT+Id,+ValidationName+FROM+ValidationRule+WHERE+EntityDefinition.QualifiedApiName='${sobjectName}'`;

    const { data: listData } = await axios.get(listUrl, { headers });

    // Step 2: Fetch full metadata for each rule
    const ruleDetails = await Promise.all(
        listData.records.map(async (rule) => {
            const detailUrl = `${instanceUrl}/services/data/v55.0/tooling/sobjects/ValidationRule/${rule.Id}`;
            const { data } = await axios.get(detailUrl, { headers });

            return {
                name: data.ValidationName,
                errorMessage: data.Metadata?.errorMessage,
                formula: data.Metadata?.errorConditionFormula,
                active: data.Active
            };
        })
    );

    return ruleDetails;
}

module.exports = { fetchValidationRules };
