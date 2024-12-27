import { ChatList } from './components/ChatList';
import { ChatWindow } from './components/ChatWindow';
import { SideMenu } from './components/SideMenu';

function App() {
  return (
    <div className="flex h-screen bg-white">
      <SideMenu />
      <div className="w-1/3 border-r">
        <ChatList />
      </div>
      <div className="w-2/3">
        <ChatWindow />
      </div>
    </div>
  );
}

export default App;