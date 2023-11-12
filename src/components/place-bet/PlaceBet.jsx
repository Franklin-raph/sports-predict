import {useEffect, useState} from 'react'

const PlaceBet = ({baseUrl, setShowPlaceBet}) => {

    useEffect(() => {
    getAllAvailableGames()
  },[])
  // https://olawaleoloye-bill.netlify.app/
  const [allMatches, setAllMatches] = useState([])
  const user = JSON.parse(localStorage.getItem("user"))
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showGames, setShowGames] = useState(false)
  const [selectedGame, setSelectedGame] = useState("Select game to predict on")

  async function getAllAvailableGames(){
    // setIsLoading(true)
    const response = await fetch(`${baseUrl}/get/matches`,{
      method:"GET",
      headers:{
        Authorization: `Bearer ${user.token}`
      }
    })
    const data = await response.json()
    if(response.ok){
      // setIsLoading(false)
      setAllMatches(data.message)
    }
    console.log(response, data)
  }

  console.log(searchTerm)

  const arr = [
    {
      team1:"Nigeria",
      team2:"USA"
    },
    {
      team1:"Argentina",
      team2:"Spain"
    },
    {
      team1:"Portugal",
      team2:"France"
    },
    {
      team1:"Ghana",
      team2:"Dubai"
    },
  ]

  function playSelectedGame(team1, team2){
    setSelectedGame(`${team1} vs ${team2}`)
  }

//   {
//     "teamsOfBet": "Brighton - Liverpool",
//     "typeOfMarket": "over-3.5",
//     "odd": "4.34",
//     "amountToPlay": "1000",
//     "bookmaker": "sportyBet"
// }

  async function placeBet(e){
    e.preventDefault()
    setIsLoading(true)
    console.log(JSON.stringify({teamsOfBet:selectedGame, typeOfMarket:"over 2", odd:"1.2", amountToPlay:"1000", bookmaker:"sportyBet"}))
    const response = await fetch(`${baseUrl}/user/place-bet`,{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify({teamsOfBet:selectedGame, typeOfMarket:"over 2", odd:"1.2", amountToPlay:"1000", bookmaker:"sportyBet"})
    })
    const data = await response.json()
    if(response) setIsLoading(false)
    console.log(response, data)
  }

  return (
    <div className='modal-bg'>
        <form className="flex items-center justify-center flex-col bg-[#fff] my-[4rem] p-5 mx-auto w-[30%] place-bet-form relative">
        <i className="ri-close-fill absolute right-2 top-2 text-2xl text-[#4F3D3D] hover:text-gray-500 cursor-pointer" onClick={() => setShowPlaceBet()}></i>
            <h2 className="font-bold text-lg mb-6">Create New Bet</h2>
            <div className='cursor-pointer'>
                <label onClick={() => console.log(searchTerm)}>Game to predict on</label>
                <div className='flex justify-between items-center bg-[#eee] px-2 py-2 text-sm rounded-md' style={{ margin:"2px 0" }} onClick={() => setShowGames(!showGames)}>
                    <p>{selectedGame}</p>
                    <i class="ri-arrow-down-s-fill"></i>
                </div>
                {showGames && 
                <div className='h-[30vh] shadow-2xl overflow-x-hidden p-3'>
                    <input type="text" placeholder='Search' onChange={e => setSearchTerm(e.target.value)}/>
                    <div>
                    {arr && arr.filter((game) => {
                    if(searchTerm === "") return game
                    else if (game.team1.toLowerCase().includes(searchTerm.toLowerCase()) || game.team2.toLowerCase().includes(searchTerm.toLowerCase())) return game
                    }).map(game => (
                            <div className='flex items-center gap-3 justify-center py-1 text-[14px] pb-2' onClick={() => playSelectedGame(game.team1, game.team2)} style={{ borderBottom:"1px solid #ccc" }}>
                                <p>{game.team1}</p>
                                <span>VS</span>
                                <p>{game.team2}</p>
                            </div>
                        ))}
                    </div>
                </div>
                }
            </div>
            <div>
                <label>Predict game outcome</label>
                <div className='flex justify-between items-center bg-[#eee] px-2 py-2 text-sm rounded-md cursor-pointer' style={{ margin:"2px 0" }}>
                    <p>Predict game outcome</p>
                    <i class="ri-arrow-down-s-fill"></i>
                </div>
            </div>
            <div>
                <label>Password</label>
                <input type="password" placeholder='****' />
            </div>
            {/* <input type="button" value="Place Bet" className="bg-[#4F3D3D] mt-3 text-white mb-2 py-2 cursor-pointer" onClick={placeBet}/> */}
            {isLoading ?
                <button className="bg-[#4F3D3D] mt-3 text-white mb-2 py-2 w-full rounded-md cursor-not-allowed">
                    <i class="fa-solid fa-gear fa-spin"></i>
                </button>
                :
                <button type="submit" disabled={isLoading} onClick={placeBet} className="bg-[#4F3D3D] mt-3 text-white mb-2 py-2 cursor-pointer w-full rounded-md">
                    Place bet
                </button>
            }
            <p>For frequently asked question, <span className='underline cursor-pointer'>Tap here</span> </p>
        </form>
    </div>
  )
}

export default PlaceBet