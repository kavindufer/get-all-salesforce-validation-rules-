import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/fetch-validation-rules', async (req, res) => {
    const { instanceUrl, sobjectName, accessToken } = req.body;

    try {
        const query = `SELECT Id, ValidationName FROM ValidationRule WHERE EntityDefinition.QualifiedApiName='${sobjectName}'`;
        const listResp = await fetch(`${instanceUrl}/services/data/v55.0/tooling/query/?q=${encodeURIComponent(query)}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        const listJson = await listResp.json();

        const rules = await Promise.all(
            listJson.records.map(async (record) => {
                const detailResp = await fetch(`${instanceUrl}${record.attributes.url}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                const detailJson = await detailResp.json();
                return {
                    name: detailJson.ValidationName,
                    formula: detailJson.Metadata?.errorConditionFormula,
                    message: detailJson.Metadata?.errorMessage
                };
            })
        );

        res.json({ success: true, rules });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));