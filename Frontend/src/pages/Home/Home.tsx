import CommonHero from '../../components/Common/CommonHero'
import FeaturesSection from '../../components/Common/FeaturesSection'

 


const Home = () => {
  return (
    <div>
      <CommonHero src="\Images\Home4.avif"
        alt="Home"
        title=" "
        subTitle=" "
      />
      
  
    
  


    

      
      {/*Hotels Section */}
      <section id="hotels" className="py-5 text-center">
        <h2 className="fw-bold mb-4"style={{ textAlign: "left", fontFamily: "Times New Roman, Times, serif" }}
>Welcome to Nova Vista</h2>
        <p className="mb-5" style={{ textAlign: "left", fontFamily:"italic" }}>Explore our luxurious hotels around Nothern.</p>
        <p style={{ textAlign: "left", fontFamily: "Times New Roman, Times, serif" }}>
  It is with heartfelt joy that we open our doors to you in Jaffna, Manner and Kilinochchi – a land where history,
  culture, and tradition live beautifully together. Here, every smile carries the warmth 
  of northern hospitality, and every moment celebrates the unique spirit of our peninsula. 
  Your stay with us promises friendly service, elegant spaces, and memorable moments. 
  At Nova Vista, we are honored to share this charm with you, creating experiences that stay with you 
  long after your journey.
  <br /><br />
  At Nova Vista Hotels, we are proud to be part of a growing chain that brings together comfort,
  elegance, and cultural authenticity. We provide not only modern rooms and seamless booking services, 
  but also specialized event management for weddings, cultural celebrations, conferences, and more. 
  Rooted in the heritage of Jaffna and enriched with contemporary hospitality, Nova Vista is dedicated
  to creating unforgettable experiences for every guest.
</p>
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <img
                  src="/Images/Home7.jpg"
                  alt="Room"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">Room</h5>
                  <p className="card-text">
                    A comfortable and elegant stay in the heart of the city.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <img
                  src="/Images/Home5.avif"
                  alt="Event"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">Events</h5>
                  <p className="card-text">
                    planner is meticulously arranging floral decorations at a reception hall, with elegant centerpieces and candlelit tables creating a romantic ambiance.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <img
                  src="/Images/Home3.avif"
                  alt="Hotel"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">view</h5>
                  <p className="card-text">
                    Relax in luxury and world-class service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff9f2",
        padding: "20px 40px",
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "1000px",
        margin: "30px auto",
      }}
    >
      {/* Left side - Text content */}
      <div>
        <h3 style={{ color: "#b22222", fontWeight: "bold", fontSize: "24px" }}>
          SAVE UP TO <span style={{ color: "#2a4fff" }}>20%</span>
        </h3>
        <p style={{ fontSize: "18px", margin: "5px 0" }}>
          Of your first Reservation
        </p>
        <p style={{ fontSize: "16px", color: "#333" }}>
          Free cancellation before <strong>20th DEC 2025</strong>
        </p>
      </div>

      {/* Right side - Image */}
      <img
        src="/Images/Home10.webp" 
        alt="Offer Gift"
        style={{
          width: "100px",
          height: "100px",
          objectFit: "contain",
          borderRadius: "8px",
        }}
      />
    </div>


  <div>
      <FeaturesSection />
    </div>
      
    </div>
  )
}

export default Home
