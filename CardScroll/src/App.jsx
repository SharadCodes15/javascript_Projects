import Card from './components/Card';

const App = () => {
  const arr = ["Algorithm","Dogma","Architects","Wastelands","Narrative","Opulence"]

  return (
    <>

      <main className="w-full text-white flex flex-col text-center gap-4 items-center pt-[15vh]">
      {arr.map((elem,i)=>{
       return <Card key={i}  i={i} elem={elem}/>
      })}
      </main>


    </>
  )
}

export default App