import Index from "./Index";



export default async function Home() {

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 6000);
  })
  
  return (
    <>
    <Index/>
    </>
  );
}
