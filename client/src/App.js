import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {

  const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    const func = () => {
        
    }

    useEffect(() => {
        subscribe()
    }, [])

    const subscribe = async () => {
        const eventSource = new EventSource('http://localhost:5000/notifications/connect/subscribe' + '/' + new Date().toLocaleTimeString())
        eventSource.onmessage = function (event) {
            const message = JSON.parse(event.data)
            console.log(message)
            setMessages(prev => [message, ...prev])
        }
    }

    const sendMessage = async () => {
        await axios.post('http://localhost:5000/notifications', {
            title: 'tit',
            description: value,
            href: 'href',
            userId: 2
        })
    }
  
  return (
    <div>
        <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
        <button onClick={sendMessage}>Отправить</button>
        <div>
            {messages.map((mes, index) => <div key={mes.id}>
                {mes.description}
            </div>)}
        </div>
    </div>
  );
}

export default App;
