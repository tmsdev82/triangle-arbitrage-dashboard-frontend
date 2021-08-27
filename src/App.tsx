import React, { useState } from "react";
import "./App.css";
import { TriangleArbitrageData } from "./classes/ArbitrageData";

let ws: WebSocket;

function App() {
  const [connected, setConnected] = useState<boolean>(false);
  const [triangleArbitrageData, setTriangleArbitrageData] = useState<TriangleArbitrageData>();

  function onOpen(event: any): void {
    console.log("Opened WebSocket connection.");
    setConnected(true);
  }

  function onMessage(event: any): void {
    let parsedData: TriangleArbitrageData = JSON.parse(event.data);
    console.log("received data for: " + parsedData.triangle + 
    ": " + parsedData.profits);

    setTriangleArbitrageData(parsedData);
  }

  function connectToBackend() {
    console.log("Connecting to backend...");
    ws = new WebSocket("ws://127.0.0.1:8000/ws");
    ws.onopen = onOpen;
    ws.onmessage = onMessage;
  }

  function disconnectFromBackend() {
    console.log("Disconnected.");
    if (ws) {
      ws.close();
    }
    setConnected(false);
  }

  function renderTriangleArbitrageDataTable() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>triangle</th>
              <th>potential profit</th>
            </tr>
          </thead>
          <tbody>
            {triangleArbitrageData?.profits.map( (triangleProfit, i) => {
              return (
                <tr key={i}>
                  <td>
                    {triangleArbitrageData.triangle}
                  </td>
                  <td className={triangleProfit > 0 ? "profit" : triangleProfit === 0 ? "" : "loss"  }>
                    {triangleProfit}
                  </td>
                </tr>
              )
            } ) }
          </tbody>
        </table>
      </div>
    ); 
  }

  return (
    <div className="App">
      <div className="title">Crypto triangle arbitrage dashboard</div>
      <div>
        {connected ? (
          <button onClick={disconnectFromBackend}>Disconnect</button>
        ) : (
          <button onClick={connectToBackend}>Connect</button>
        )}
      </div>
      <div>
          {triangleArbitrageData ? renderTriangleArbitrageDataTable() : <div>No data to show, please connect to backend.</div> }
      </div>
    </div>
  );
}

export default App;
