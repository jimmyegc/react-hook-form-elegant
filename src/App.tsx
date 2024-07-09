import './App.css'
import { UserForm } from './components/UserForm'

function App() {
  const user = {
    name: "Jimmy",
    email: "jimmy@microsoft.com",
    website: "www.microsoft.com",
    country: "mx"
  }

  const handleSave = (values) => {
    console.log({ values })
  }

  return (
    <>
      <UserForm onSave={handleSave} {...{ user }} />
    </>
  )
}

export default App
