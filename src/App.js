import './App.css'
import {TomatoGirl} from './components/TomatoGirl/index'
import {TomatoTimer} from './components/timer/index.js'

export const App = () => (
    <div className="tomato_timer">
        <TomatoGirl />
        <TomatoTimer />
    </div>
)


