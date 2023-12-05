import {useState, useEffect} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import SignIn from '../../components/sign-in/SignIn'
import SignUp from '../../components/sign-up/SignUp'
import PlaceBet from '../../components/place-bet/PlaceBet'
import Navbar from '../../components/navbar/Navbar'

const Home = ({baseUrl}) => {

  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()
  const location = useLocation()
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [showPlaceBet, setShowPlaceBet] = useState(false)
  const [allMatches, setAllMatches] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const homeTabs =  ["All", "Pending", "Completed"]
  const [message, setMessage] = useState("")
  const [gameTabHeading, setGameTabHeading] = useState("All Games")
  const [activeTab, setActiveTab] = useState(homeTabs[0])
  const [pendingGames, setPendingGames] = useState()

  useEffect(() => {
    getAllAvailableMatches()
  },[])

  async function getAllAvailableMatches(){
    setIsLoading(true)
    const response = await fetch(`${baseUrl}/user/dynamic-details`,{
      method:"GET",
      headers:{
        Authorization: `Bearer ${user.token}`
      }
    })
    const data = await response.json()
    if(response.ok){
      setIsLoading(false)
      setAllMatches(data.message.userGamesDetails.allPlacedGames)
    }
    console.log(response, data)
    console.log(data.message.userGamesDetails)
  }
  
  const handleTabClick = (tab) => {
    setActiveTab(tab)
    if(tab === "All"){
      setGameTabHeading("All Games")
      setMessage("")
      getAllAvailableMatches()
    }
    if(tab === "Pending"){
      setGameTabHeading("Pending Games")
      const pendingGames = allMatches
          .filter(obj => obj.winOrlost === "pending")
          .map(obj => obj.winOrlost);
          console.log(pendingGames)
      setPendingGames(pendingGames)
      // playedMatches()
    }
    if(tab === "Completed"){
      setGameTabHeading("Completed Games")
      unPlayedMatches()
    }
  }
  
  // const playedMatches = async () => {
  //   console.log("Played")
  //   setAllMatches([])
  //   setIsLoading(true)
  //   const response = await fetch(`${baseUrl}/user/dynamic-details`, {
  //     method:"GET",
  //     headers:{
  //       Authorization: `Bearer ${user.token}`
  //     }
  //   })
  //   if(response) setIsLoading(false)
  //   const data = await response.json()
  //   if(response.ok){
  //     setAllMatches(data.message.userGamesDetails.allPlacedGames)
  //   }
  //   if(data.message.userGamesDetails.allPlacedGames.length === 0){
  //     setMessage("You currently do not have any pending games yet")
  //   }
  //   console.log(data)
  // }

  // const unPlayedMatches = async () => {
  //   console.log("Played")
  //   setIsLoading(true)
  //   const response = await fetch(`${baseUrl}/user/dynamic-details`, {
  //     method:"GET",
  //     headers:{
  //       Authorization: `Bearer ${user.token}`
  //     }
  //   })
  //   if(response) setIsLoading(false)
  //   const data = await response.json()
  //   console.log(data)
  // }


  return (
    <div>
      <div className="all-games flex items-center justify-center flex-col bg-[#fff] my-[6rem] p-5 mx-auto w-[37%]">
        <Navbar setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} baseUrl={baseUrl}/>
        <div className='w-full'>
          <div className="flex items-center justify-between my-5">
            <h2 className='text-lg font-bold text-[#4F3D3D]'>{gameTabHeading}</h2>
          </div>
          {user &&
          <div>
            <div className='flex items-center justify-between mt-3'>
              <div className='flex items-center gap-3'>
                {homeTabs.map((tab, index) => 
                  <button
                      key={index}
                      className={`home-tab ${activeTab === tab ? 'active-tab' : ''}`}
                      onClick={() => handleTabClick(tab)}
                  >{tab}
                  </button>
                )}
                {/* <button className='bg-[#797979]'>Played</button>
                <button className='bg-[#797979]'>Unplayed</button> */}
              </div>
              <button className='bg-[#4F3D3D]' onClick={() => setShowPlaceBet(true)}>+</button>
            </div>
          </div>
          }
          <div className='my-5'>
            {
              activeTab === "All" && (
                <div>
                  {allMatches && allMatches.map(match => (
                    
                    <div className="bg-gray-200 text-sm py-3 rounded my-2">
                      {console.log(match.winOrlost)}
                      {/* <p className='text-center mb-3'>{match.league}</p> */}
                      <div className='flex items-center gap-3 justify-center'>
                      <p>{match.teamsOfBet}</p>
                        {/* <p>{match.team1}</p>
                        <span>VS</span>
                        <p>{match.team2}</p> */}
                      </div>
                      <div className='flex items-center justify-between px-7'>
                        <div className='flex items-center gap-2 text-[#4F3D3D]'>
                          <i class="fa-regular fa-clock"></i>
                          <p className='text-center'>{match.time}</p>
                        </div>
                        <div className='flex items-center gap-1'>
                          {match.winOrlost === "won" && <p className='p-[5px] rounded-full bg-green-500'></p>}
                          {match.winOrlost == undefined && <p className='p-[5px] rounded-full bg-yellow-500'></p>}
                          {match.winOrlost === "lost" && <p className='p-[5px] rounded-full bg-red-500'></p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
            {/* {allMatches.map(match => (
              <div className="bg-gray-300 py-4 rounded my-2">
                <p className='text-center mb-3'>{match.league}</p>
                <div className='flex items-center gap-3 justify-center'>
                  <p>{match.team1}</p>
                  <span>VS</span>
                  <p>{match.team2}</p>
                </div>
                <p className='text-center mt-3'>{match.time}</p>
              </div>
            ))} */}
            
          </div>
          <div className='my-5'>
            {
              activeTab === "Pending" && (
                <div>
                  {message && <p className='text-center'>{message}</p> }
                  {pendingGames && pendingGames.map(match => (
                    <div className="bg-gray-300 py-4 rounded my-2">
                      {/* <p className='text-center mb-3'>{match.league}</p> */}
                      <div className='flex items-center gap-3 justify-center'>
                      <p>{match.teamsOfBet}</p>
                        {/* <p>{match.team1}</p>
                        <span>VS</span>
                        <p>{match.team2}</p> */}
                      </div>
                      {/* <p className='text-center mt-3'>{match.time}</p> */}
                    </div>
                  ))}
                </div>
              )
            }
            {/* {allMatches.map(match => (
              <div className="bg-gray-300 py-4 rounded my-2">
                <p className='text-center mb-3'>{match.league}</p>
                <div className='flex items-center gap-3 justify-center'>
                  <p>{match.team1}</p>
                  <span>VS</span>
                  <p>{match.team2}</p>
                </div>
                <p className='text-center mt-3'>{match.time}</p>
              </div>
            ))} */}
            
          </div>
          <div className='my-5'>
            {
              activeTab === "Completed" && (
                <div>
                  <p>No completed games yet</p>
                  {/* dey what? dey play :) */}
                </div>
              )
            }
            {/* {allMatches.map(match => (
              <div className="bg-gray-300 py-4 rounded my-2">
                <p className='text-center mb-3'>{match.league}</p>
                <div className='flex items-center gap-3 justify-center'>
                  <p>{match.team1}</p>
                  <span>VS</span>
                  <p>{match.team2}</p>
                </div>
                <p className='text-center mt-3'>{match.time}</p>
              </div>
            ))} */}
            
          </div>
          <div className="my-5">
            {isLoading &&
              <div>
                <div className="bg-gray-300 py-4 rounded my-2 animated-background"></div>
                <div className="bg-gray-300 py-4 rounded my-2 animated-background"></div>
                <div className="bg-gray-300 py-4 rounded my-2 animated-background"></div>
                <div className="bg-gray-300 py-4 rounded my-2 animated-background"></div>
                <div className="bg-gray-300 py-4 rounded my-2 animated-background"></div>
              </div>
            }
          </div>
        </div>
      </div>
      {showSignIn && <SignIn setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} baseUrl={baseUrl}/>}
      {showSignUp && <SignUp setShowSignUp={setShowSignUp} setShowSignIn={setShowSignIn} baseUrl={baseUrl}/>}
      {showPlaceBet && <PlaceBet setShowPlaceBet={setShowPlaceBet} baseUrl={baseUrl}/> }
      
    </div>
  )
}

export default Home