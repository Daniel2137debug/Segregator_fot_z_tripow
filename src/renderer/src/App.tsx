import { useState } from 'react';

function App() {
  const [filePath, setFilePath] = useState<string | null>(null);
  const [labels, setLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSelect = async () => {
    
  //----------------------------komunikacja z API-----------------------------------
    // @ts-ignore
    const path = await window.electronAPI.selectFile();
    if (path) setFilePath(path);
  };
//--------------------------------wysylanie i odbieranie danych z google vision---------------------------------

  const handleAnalyze = async () => {
    if (!filePath) return;

    setLoading(true);
    // @ts-ignore
    const result = await window.electronAPI.analyze(filePath);
    setLabels(result);
    setLoading(false);
  };
//------------------------------------UI--------------------------------------------  
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>
        Photo Sorter <br />
        <span style={{ fontSize: '0.5em', fontWeight: 'normal' }}>
          by Daniel Moskalewicz
        </span>
      </h1>

      <button onClick={handleSelect}
        style={{ width: '100%', padding: '15px', marginBottom: '20px' }}>
        SELECT PHOTO
      </button>

      {filePath && <p>Selected: {filePath}</p>}

      {filePath && !loading && (
        <button onClick={handleAnalyze}
          style={{ width: '100%', padding: '15px' }}>
          ANALYZE PHOTO
        </button>
      )}

      {loading && <h3>Processing...</h3>}

      {labels.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Google Vision Results:</h3>
          <ul>
            {labels.map((l, i) => <li key={i}>{l}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
