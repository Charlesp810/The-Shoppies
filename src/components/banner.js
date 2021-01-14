import goldenBanner from '../images/golden-award.png'

function Banner() {
  return (
    <div className="banner-container">
      <img className="banner-image" src={goldenBanner} alt="golden banner" />
      <div className="banner-text">
        <h2>Nominations Are Set</h2>
        <h3>Thank You</h3>
      </div>
    </div>
  )
}

export default Banner;