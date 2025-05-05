import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { fetchMetrics } from '../services/api';
import { Typography, Paper, Grid, TextField, Button, CircularProgress } from '@mui/material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const AnalyticsDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [q, setQ] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMetrics().then(data => setMetrics(data));
  }, []);

  const askAI = async () => {
    if (!q || !metrics) return;
    setLoading(true);

    const prompt = `You are a helpful assistant for a canteen admin.
Admin asks: "${q}"

Here is the current analytics data:

Time Slots: ${JSON.stringify(metrics.timeSlotData)}
Hourly Profits: ${JSON.stringify(metrics.hourlyProfit)}
Top Selling Items: ${JSON.stringify(metrics.mostSoldItems)}

Give actionable and clear suggestions. You are asked this question via an api so the o/p you are producing will be directly displayed in website so give output in 2-3 lines straight forward without any other matters.`;

    try {
      const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyB1PMRozYxiDFDo9Ll2sPSzVqoYqj90PFs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await res.json();
      setAiResponse(data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received.');
    } catch (err) {
      setAiResponse('Error fetching AI response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, m: 2 }}>
      <Typography variant="h4" gutterBottom>Sales Analytics</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Orders per Time Slot</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metrics?.timeSlotData || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="slot" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6">Profit by Hour</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metrics?.hourlyProfit || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="profit" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Top Selling Items</Typography>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={metrics?.mostSoldItems || []}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="quantity"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {metrics?.mostSoldItems?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Ask AI Assistant</Typography>
          <TextField
            label="Ask something..."
            fullWidth
            variant="outlined"
            value={q}
            onChange={e => setQ(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={askAI} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Ask'}
          </Button>
          {aiResponse && (
            <Paper elevation={1} sx={{ mt: 3, p: 2, background: '#f3f3f3' }}>
              <Typography variant="subtitle1">AI Response:</Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>{aiResponse}</Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};
const FloatingChatBot = ({ q, setQ, askAI, loading, aiResponse }) => {
    const [open, setOpen] = useState(false);
  
    return (
      <>
        <Button
          variant="contained"
          onClick={() => setOpen(!open)}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            borderRadius: '50%',
            minWidth: 64,
            minHeight: 64,
            backgroundColor: '#1976d2',
            zIndex: 1000
          }}
        >
          💬
        </Button>
  
        {open && (
          <Paper
            elevation={5}
            sx={{
              position: 'fixed',
              bottom: 100,
              right: 24,
              width: 320,
              maxHeight: 500,
              p: 2,
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              backgroundColor: 'white'
            }}
          >
            <Typography variant="h6">Ask AI Assistant</Typography>
            <TextField
              label="Ask something..."
              fullWidth
              size="small"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={askAI}
              disabled={loading}
              sx={{ alignSelf: 'flex-end' }}
            >
              {loading ? <CircularProgress size={20} /> : 'Ask'}
            </Button>
            {aiResponse && (
              <Paper sx={{ p: 1, mt: 1, background: '#f5f5f5' }}>
                <Typography variant="caption">AI:</Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                  {aiResponse}
                </Typography>
              </Paper>
            )}
          </Paper>
        )}
      </>
    );
  };
  
export default AnalyticsDashboard;
