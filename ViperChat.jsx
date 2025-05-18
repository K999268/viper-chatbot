
import { useState } from 'react';

const scamKeywords = [
  'urgent', 'act now', 'free gift', 'click this link', 'congratulations',
  'you won', 'verify account', 'send money', 'bank details', 'lottery'
];

export default function ViperChat() {
  const [messages, setMessages] = useState([
    { from: 'viper', text: "Hey there! I’m Viper, your chatbot. Alvin isn’t at his phone right now, so talk to me instead!" }
  ]);
  const [input, setInput] = useState('');
  const [scamLog, setScamLog] = useState([]);

  const checkForScam = (text) => {
    const lower = text.toLowerCase();
    return scamKeywords.some(word => lower.includes(word));
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const isScam = checkForScam(input);
    const userMsg = { from: 'user', text: input };
    const viperReply = isScam
      ? { from: 'viper', text: "⚠️ That message looks suspicious. Be careful!" }
      : { from: 'viper', text: "Got it! Let me know if you need anything else." };

    setMessages(prev => [...prev, userMsg, viperReply]);
    if (isScam) setScamLog(prev => [...prev, input]);
    setInput('');
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <img src="/viper-logo.png" alt="Viper Logo" style={{ width: '100px', margin: 'auto', display: 'block' }} />
      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginBottom: '10px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ color: msg.from === 'viper' ? 'green' : 'blue' }}>{msg.text}</div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." style={{ flexGrow: 1 }} />
        <button onClick={sendMessage}>Send</button>
      </div>
      {scamLog.length > 0 && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#fff3cd', border: '1px solid #ffeeba' }}>
          <strong>⚠️ Scam Log:</strong>
          <ul>
            {scamLog.map((entry, idx) => (
              <li key={idx}>{entry}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
