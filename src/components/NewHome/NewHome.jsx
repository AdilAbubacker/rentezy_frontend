import React from 'react'
// import './NewHome.css'
// import 'bootstrap/dist/css/bootstrap.min.css';


function NewHome() {
  return (
    <div>
    
{/* 
		<div className="hero">
			<div className="container mx-auto">
				<div className="flex items-center">
					<div className="lg:w-7/12">
						<div className="intro-wrap">
							<h1 className="mb-1"><span className="block">Let's Enjoy Your</span> Trip In <span className="typed-words"></span></h1>

							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
								<div className="mb-3 sm:mb-0">
									<select name="" id="" className="form-select custom-select">
										<option value="">Destination</option>
										<option value="">Peru</option>
										<option value="">Japan</option>
										<option value="">Thailand</option>
										<option value="">Brazil</option>
										<option value="">United States</option>
										<option value="">Israel</option>
										<option value="">China</option>
										<option value="">Russia</option>
									</select>
								</div>
								<div className="mb-3 sm:mb-0">
									<input type="text" className="form-input" name="daterange" />
								</div>
								<div className="mb-3 sm:mb-0">
									<input type="text" className="form-input" placeholder="# of People" />
								</div>
							</div>

							<div className="flex items-center">
								<div className="w-full md:w-1/2 lg:w-1/3 mb-3 md:mb-0">
									<input type="submit" className="btn btn-primary btn-block" value="Search" />
								</div>
								<div className="w-full md:w-1/2 lg:w-2/3">
									<label className="control control--checkbox mt-3">
										<span className="caption">Save this search</span>
										<input type="checkbox" defaultChecked />
										<div className="control__indicator"></div>
									</label>
								</div>
							</div>
						</div>
					</div>
					<div className="lg:w-5/12">
						<div className="slides">
							<img src="images/hero-slider-1.jpg" alt="Image" className="w-full h-auto active" />
							<img src="images/hero-slider-2.jpg" alt="Image" className="w-full h-auto" />
							<img src="images/hero-slider-3.jpg" alt="Image" className="w-full h-auto" />
							<img src="images/hero-slider-4.jpg" alt="Image" className="w-full h-auto" />
							<img src="images/hero-slider-5.jpg" alt="Image" className="w-full h-auto" />
						</div>
					</div>
				</div>
			</div>
		</div>
*/}
	
	<div className="hero">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-7">
                    <div className="intro-wrap">
                      <h1 className="mb-5"><span className="d-block">Let's Enjoy Your</span> Trip In <span className="typed-words"></span></h1>
          
                      <div className="row">
                        <div className="col-12">
                          <form className="form">
                            <div className="row mb-2">
                              <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-4">
                                <select name="" id="" className="form-control custom-select">
                                  <option value="">Destination</option>
                                  <option value="Peru">Peru</option>
                                  <option value="Japan">Japan</option>
                                  <option value="Thailand">Thailand</option>
                                  <option value="Brazil">Brazil</option>
                                  <option value="United States">United States</option>
                                  <option value="Israel">Israel</option>
                                  <option value="China">China</option>
                                  <option value="Russia">Russia</option>
                                </select>
                              </div>
                              <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-5">
                                <input type="text" className="form-control" name="daterange" />
                              </div>
                              <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-3">
                                <input type="text" className="form-control" placeholder="# of People" />
                              </div>
                            </div>
                            <div className="row align-items-center">
                              <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-4">
                                <input type="submit" className="btn btn-primary btn-block" value="Search" />
                              </div>
                              <div className="col-lg-8">
                                <label className="control control--checkbox mt-3">
                                  <span className="caption">Save this search</span>
                                  <input type="checkbox" defaultChecked />
                                  <div className="control__indicator"></div>
                                </label>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="slides">
                      <img src="images/hero-slider-1.jpg" alt="Image" className="img-fluid active" />
                      <img src="images/hero-slider-2.jpg" alt="Image" className="img-fluid" />
                      <img src="images/hero-slider-3.jpg" alt="Image" className="img-fluid" />
                      <img src="images/hero-slider-4.jpg" alt="Image" className="img-fluid" />
                      <img src="images/hero-slider-5.jpg" alt="Image" className="img-fluid" />
                    </div>
                  </div>
                </div>
              </div>
            </div>       


			<div class="untree_co-section">
		<div class="container">
			<div class="row mb-5 justify-content-center">
				<div class="col-lg-6 text-center">
					<h2 class="section-title text-center mb-3">Our Services</h2>
					<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
				</div>
			</div>
			<div class="row align-items-stretch">
				<div class="col-lg-4 order-lg-1">
					<div class="h-100"><div class="frame h-100"><div class="feature-img-bg h-100" 
					// style="background-image: url('images/hero-slider-1.jpg');"
					></div></div></div>
				</div>

				<div class="col-6 col-sm-6 col-lg-4 feature-1-wrap d-md-flex flex-md-column order-lg-1" >

					<div class="feature-1 d-md-flex">
						<div class="align-self-center">
							<span class="flaticon-house display-4 text-primary"></span>
							<h3>Beautiful Condo</h3>
							<p class="mb-0">Even the all-powerful Pointing has no control about the blind texts.</p>
						</div>
					</div>

					<div class="feature-1 ">
						<div class="align-self-center">
							<span class="flaticon-restaurant display-4 text-primary"></span>
							<h3>Restaurants & Cafe</h3>
							<p class="mb-0">Even the all-powerful Pointing has no control about the blind texts.</p>
						</div>
					</div>

				</div>

				<div class="col-6 col-sm-6 col-lg-4 feature-1-wrap d-md-flex flex-md-column order-lg-3" >

					<div class="feature-1 d-md-flex">
						<div class="align-self-center">
							<span class="flaticon-mail display-4 text-primary"></span>
							<h3>Easy to Connect</h3>
							<p class="mb-0">Even the all-powerful Pointing has no control about the blind texts.</p>
						</div>
					</div>

					<div class="feature-1 d-md-flex">
						<div class="align-self-center">
							<span class="flaticon-phone-call display-4 text-primary"></span>
							<h3>24/7 Support</h3>
							<p class="mb-0">Even the all-powerful Pointing has no control about the blind texts.</p>
						</div>
					</div>

				</div>

			</div>
		</div>
	</div>   
        
    </div>
  )
}

export default NewHome
