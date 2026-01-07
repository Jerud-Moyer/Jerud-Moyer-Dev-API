import { Router } from 'express'

export default Router()
  .get('/set-sleep-timer', (req, res) => {
    console.log('TV SLEEP TIMER INITIATED');
    let response = null
    const shutdownUrl: string = process.env.STEAMING_TV_SHUTDOWN_URL as string
    setTimeout(async() => {
      response = await fetch('https://app1.sofabaton.com/app/keypress?node_id=fpRXbAn3WZxJWDj5qpKQbA&id=fpRXbAn101&type=0')
      if(response) {
        console.log('TIMED PROCESS EXECUTED')
    }
    res.json({ message: 'Sleep Timer Initiated' })
    }, 900000)
  })
