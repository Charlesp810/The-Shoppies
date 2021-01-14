import goldenBanner from '../images/golden-award.png'

function Banner() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
  return (
    <div className="banner-container">
      <img className="banner-image" src={goldenBanner} alt="golden banner" />
      <div className="banner-text">
        <h2>Nominations Are Set</h2>
        <h3>Thank You</h3>
      </div>
      {scrollToTop()}
    </div>
  )
}

export default Banner;