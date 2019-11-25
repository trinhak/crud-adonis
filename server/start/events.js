const Event = use('Event');
const Mail = use('Mail');
Event.on('new::login', async (email) => {
  try {
    const a = 'hehe'
    await Mail.send('emails.welcome', a, (message) => {
      message
        .to('trinh.nguyen@smartdev.vn')
        .from('test@gamil.com')
    })
  } catch (error) {
    console.log('error', error)
  }
})
