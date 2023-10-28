
import Feed from '@components/Feed'
const Home = () => {
  return (
<section className="w-full flex-col flex-center">
  <h1 className="head_text blue_gradient text-center">
  Discover Tips and Tricks of Tech 
    <br className="max-md:hidden" />
    <span className="text-white"> Tech Talks & Tango Walks</span>
  </h1>
  <p className="text-white desc z-0 text-center">TechTango: Where Tech Enthusiasts Unite, Share, and Thrive!</p>
  <Feed />
</section>

  )
}

export default Home