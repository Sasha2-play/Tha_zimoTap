import React, { useState, useEffect } from 'react';
import { Coins, Zap, Users, ArrowRight, Trophy } from 'lucide-react';
import { openTonPayment } from '@/app/(tabs)/donate';

interface Task {
  id: number;
  name: string;
  reward: number;
  completed: boolean;
}

function App() {
  const [coins, setCoins] = useState(0);
  const [tapPower, setTapPower] = useState(1);
  const [tapSpeed, setTapSpeed] = useState(0);
  const [lastTapTime, setLastTapTime] = useState(Date.now());
  const [tapsHistory, setTapsHistory] = useState<number[]>([]);
  const [showTasks, setShowTasks] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "Subscribe to Channel 1", reward: 100, completed: false },
    { id: 2, name: "Subscribe to Channel 2", reward: 150, completed: false },
    { id: 3, name: "Join Group 1", reward: 200, completed: false },
    { id: 4, name: "Subscribe to Channel 3", reward: 250, completed: false },
  ]);

  useEffect(() => {
    if (tapsHistory.length >= 10) {
      const recentTaps = tapsHistory.slice(-10);
      const averageInterval = calculateAverageInterval(recentTaps);
      const speedTps = averageInterval ? 1000 / averageInterval : 0;
      setTapSpeed(Math.round(speedTps * 100) / 100);
    }
  }, [tapsHistory]);

  const calculateAverageInterval = (timestamps: number[]) => {
    if (timestamps.length < 2) return 0;
    const intervals = [];
    for (let i = 1; i < timestamps.length; i++) {
      intervals.push(timestamps[i] - timestamps[i - 1]);
    }
    return intervals.reduce((a, b) => a + b, 0) / intervals.length;
  };

  const handleTap = () => {
    const now = Date.now();
    setTapsHistory(prev => [...prev, now]);
    setLastTapTime(now);
    
    const baseCoins = tapPower;
    const speedBonus = Math.floor(tapSpeed);
    const totalCoins = baseCoins + speedBonus;
    
    setCoins(prev => prev + totalCoins);
  };

  const completeTask = (taskId: number) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId && !task.completed) {
        setCoins(coins => coins + task.reward);
        return { ...task, completed: true };
      }
      return task;
    }));
  };

  const upgradeTapPower = () => {
    const cost = tapPower * 100;
    if (coins >= cost) {
      setCoins(prev => prev - cost);
      setTapPower(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      {/* Header */}
      <div className="bg-black/30 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Coins className="w-6 h-6" />
          <span className="text-xl font-bold">{coins}</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6" />
          <span>{tapSpeed.toFixed(1)} taps/s</span>
        </div>
      </div>

      {showTasks ? (
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Tasks</h2>
            <button
              onClick={() => setShowTasks(false)}
              className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
          <div className="space-y-4">
            {tasks.map(task => (
              <div
                key={task.id}
                className={`bg-white/10 p-4 rounded-lg flex justify-between items-center ${
                  task.completed ? 'opacity-50' : ''
                }`}
              >
                <div>
                  <div className="font-semibold">{task.name}</div>
                  <div className="text-sm text-white/70">Reward: {task.reward} coins</div>
                </div>
                <button
                  onClick={() => completeTask(task.id)}
                  disabled={task.completed}
                  className={`px-4 py-2 rounded-lg ${
                    task.completed
                      ? 'bg-green-500'
                      : 'bg-blue-500 hover:bg-blue-600'
                  } transition-colors`}
                >
                  {task.completed ? 'Completed' : 'Complete'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-72px)]">
          {/* Main Tapping Area */}
          <div className="text-center mb-8">
            <div className="text-sm opacity-70 mb-2">Tap Power: {tapPower}</div>
            <button
              onClick={handleTap}
              className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all"
            >
              <Coins className="w-16 h-16" />
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="fixed bottom-0 left-0 right-0 bg-black/30 p-4">
            <div className="flex justify-around max-w-md mx-auto">
              <button
                onClick={() => setShowTasks(true)}
                className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
              >
                <Trophy className="w-6 h-6" />
                <span className="text-sm">Tasks</span>
              </button>
              <button
                onClick={upgradeTapPower}
                className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
              >
                <Zap className="w-6 h-6" />
                <span className="text-sm">Upgrade ({tapPower * 100})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1a1a4f',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 32,
  },
  walletCard: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  walletGradient: {
    padding: 16,
  },
  walletCardPressed: {
    transform: [{ scale: 0.98 }],
  },
  walletLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  walletAddress: {
    fontSize: 16,
    color: '#00ffff',
    marginBottom: 8,
  },
  copyButton: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  rewardNote: {
    marginTop: 24,
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  const: tg = window.Telegram.WebApp,
  tg,: .expand(),
  const: DONATION_AMOUNT_TON = 0.1,
  const: TON_WALLET = 'UQARJUg2Ewvs60wvRCXkLjqMPN24AjUpJtitjR8R9VQ_E80p',
  const: TONAPI_URL = `https://tonapi.io/v1/blockchain/getTransactions?account=${TON_WALLET}&limit=5`,

  function: checkPayment()
}, {
  try: {
    const: response = await fetch(TONAPI_URL),
    const: data = await response.json(),
    const: transactions = data.transactions,

    for(, tx, of, transactions): true | undefined {
      const amountTON = parseFloat(tx.amount) / 1e9;
      if (amountTON === DONATION_AMOUNT_TON) {
        return true;
      }
    }
  }, catch(error): void {
    console.error('Ошибка проверки оплаты:', error);
  },
  return: false
},

  function openTonPayment() {
    window.open(`https://tonhub.com/transfer/${TON_WALLET}?amount=${DONATION_AMOUNT_TON * 1000000000}`, '_blank');
  },

  async function unlockBoosters() {
    const paid = await checkPayment();
    if (paid) {
      alert('Оплата получена! Первая половина бустеров открыта!');
    } else {
      alert('Оплата не найдена. Попробуйте позже.');
    }
  },

  document.getElementById('donateButton').addEventListener('click', async () => {
    openTonPayment();
    setTimeout(unlockBoosters, 10000); // Ждём 10 секунд и проверяем
  }));
