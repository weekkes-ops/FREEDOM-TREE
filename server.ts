import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API client lazily or safely with User-Agent header
  const getGenAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    return new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // API Health Check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      organization: 'Freedom Tree Sierra Leone',
      mission: 'Working within communities to reduce maternal and infant mortality in Sierra Leone',
      hotline: '+232 76 522 072',
      address: '11 Bundu Street Off Bo Taiama Highway, Bo, Sierra Leone',
    });
  });

  // AI Maternal Health Assistant Endpoint
  app.post('/api/ai/maternal-assistant', async (req, res) => {
    try {
      const { message, context, language = 'English', mode = 'triage' } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const ai = getGenAI();
      if (!ai) {
        // Fallback intelligent clinical guidance if API key is not configured
        return res.json({
          reply: `**Freedom Tree Clinical Advisory:** For urgent maternal symptoms (severe headache, blurred vision, vaginal bleeding, high fever, or reduced fetal movement), refer immediately to the **Freedom Tree Bo Center** (11 Bundu Street Off Bo Taiama Highway) or call our 24/7 Maternal Emergency Line at **+232 76 522 072**.\n\n*Key Protocol*: Ensure clean delivery kit (sterile blade, cord clamps, soap, plastic sheet) is prepared, keep the mother hydrated, and never administer unprescribed oxytocics in the community.`,
          warningSignsDetected: ['emergency_referral_check'],
          recommendedActions: [
            'Check maternal blood pressure & fetal heart rate',
            'Prepare Freedom Tree Clean Mama Kit',
            'Contact Emergency Dispatch (+232 76 522 072) if transport is required',
          ],
        });
      }

      const systemInstruction = `You are the Freedom Tree Sierra Leone Maternal & Infant Health AI Advisor.
Your mission is aligned with Freedom Tree Sierra Leone (Address: 11 Bundu Street Off Bo Taiama Highway, Bo, Sierra Leone; Contact: +232 76 522 072, Lead Partner: New Harvest Global Ministries).

You provide expert, empathetic, WHO and Sierra Leone Ministry of Health-grounded clinical decision support, triage guidance, and community education for:
1. Community Health Workers (CHWs) and Traditional Birth Attendants in Bo District, Southern Province, and across Sierra Leone.
2. Expectant mothers and families seeking pregnancy guidance, danger sign recognition, antenatal schedule, and nutrition advice (e.g., local nutritious foods like moringa, groundnuts, cassava leaf soup with fish, benne seeds).
3. Clean Delivery Kit ("Mama Kit") instructions (sterile cord ties, surgical razor, chlorhexidine/antiseptic soap, clean delivery sheet, warm newborn cloth).
4. Critical Obstetric Danger Signs:
   - Severe vaginal bleeding (antepartum or postpartum hemorrhage)
   - Severe pre-eclampsia / eclampsia symptoms (severe frontal headache, visual disturbances, epigastric pain, elevated BP >140/90)
   - Obstructed or prolonged labor (>12 hours in active phase)
   - Maternal fever / foul lochia (puerperal sepsis)
   - Neonatal danger signs (poor suckling, hypothermia, chest indrawing, convulsions, cord redness/pus)

Always emphasize:
- When danger signs appear, emphasize immediate referral to Freedom Tree Bo Center or the nearest Peripheral Health Unit (PHU) / Bo Government Hospital.
- Freedom Tree 24/7 Hotline: +232 76 522 072.
- Provide clear, structured, compassionate advice. If requested or appropriate, include brief phrases in Sierra Leone Krio (e.g., "Kusheh! Mared wata klin delivery", "Go to di clinic quick quick").
- Never give dangerous off-label pharmaceutical prescriptions; focus on stabilization, sterile kit hygiene, warmth for newborn (skin-to-skin kangaroo care), and immediate transport.`;

      const prompt = `Context: ${context || 'General inquiry'}
Mode: ${mode}
Selected Language/Dialect: ${language}
User Query: ${message}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.4,
        },
      });

      res.json({
        reply: response.text || 'No response generated.',
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error('Gemini maternal assistant error:', error);
      res.status(500).json({
        error: 'Failed to process maternal health query',
        details: error?.message || 'Server error',
        fallback: 'For emergency maternal care in Sierra Leone, immediately call Freedom Tree Bo Center at +232 76 522 072.',
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Freedom Tree Sierra Leone server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
