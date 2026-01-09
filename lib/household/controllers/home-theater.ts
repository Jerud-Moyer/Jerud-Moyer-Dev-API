import { Router } from 'express'

export default Router()
  .get('/set-sleep-timer', async(req, res) => {
    console.log('TV SLEEP TIMER INITIATED');
    res.json({ message: 'Sleep Timer Initiated' })
    let response = null
    const shutdownUrl: string = process.env.STEAMING_TV_SHUTDOWN_URL as string
    setTimeout(async() => {
      response = await fetch(shutdownUrl)
      if(response) {
        console.log('TIMED PROCESS EXECUTED')
      }
    }, 5400000)
    // 90 minutes
  })
