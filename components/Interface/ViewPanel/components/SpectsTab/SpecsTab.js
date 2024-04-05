app.component('specs-tab', {
    template: 
    /*html*/
    `
    <div class="display-system" id="specs-container">
    
        <div class="specs-flex">
        
            <div class="specs-header"> <div class="spec-info" title="Two-Line Element Set (TLE) is a data format encoding a list of orbital elements for an Earth-orbiting object at a specific point in time.">?</div>  TLE</div>
            <div class="specs-data-display">
                <div id="specs-box">
                    <spec v-for="spec in specs" :spec="spec"></spec>    
                </div>
            </div>
            
        
        </div>

        <div class="specs-flex">

            <div class="specs-header"><img src="./assets/bing.png" alt="powered-by-bing-copilot" width="30px" /> MICROSOFT COPILOT</div>                
            <div class="specs-data-display">
                    <output id="chatbot-response" readonly value="
                    The Fermi Gamma-ray Space Telescope (FGST), formerly known as the Gamma-ray Large Area Space Telescope (GLAST), is a remarkable space observatory designed for gamma-ray astronomy observations from low Earth orbit. Let’s delve into its fascinating details:
                    Purpose and Mission:
                    The Fermi telescope aims to explore the energy of the universe by studying gamma rays.
                    Its primary instrument is the Large Area Telescope (LAT), which detects photons with energies ranging from about 20 million to 300 billion electronvolts (20 MeV to 300 GeV).
                    The LAT covers approximately 20% of the sky and serves as a successor to the EGRET instrument on the Compton Gamma Ray Observatory.
                    Another instrument aboard Fermi is the Gamma-ray Burst Monitor (GBM), which studies gamma-ray bursts and solar flares.
                    Launch and Collaboration:
                    Fermi was launched on June 11, 2008, at 16:05 UTC aboard a Delta II 7920-H rocket.
                    The mission is a joint venture involving NASA, the United States Department of Energy, and government agencies from France, Germany, Italy, Japan, and Sweden.
                    It has become the most sensitive gamma-ray telescope in orbit, surpassing the capabilities of the INTEGRAL telescope.
                    Scientific Instruments:
                    Large Area Telescope (LAT):
                    An imaging gamma-ray detector that detects photons in the specified energy range.
                    Provides an all-sky survey to study phenomena such as active galactic nuclei, pulsars, high-energy sources, and dark matter.
                    Gamma-ray Burst Monitor (GBM):
                    Consists of 14 scintillation detectors.
                    Detects gamma-ray bursts across the entire sky not occluded by Earth.
                    Legacy and Recognition:
                    Fermi is named after the renowned high-energy physics pioneer, Enrico Fermi.
                    The project is a recognized CERN experiment (RE7).
                    In summary, the Fermi Gamma-ray Space Telescope plays a crucial role in unraveling the mysteries of the high-energy universe, and its observations continue to enhance our understanding of cosmic phenomena. 🌌🔭🌠
                    "
                    ></output>
                </div>
            </div>
    
        </div>

    </div>
    `
    ,
    data() {
        return {
            specs: [
                {id: 'name-spec', name:"NAME: ", info: ""},
                {id: 'norad-spec', name:'NORAD: ', info: "The NORAD Catalog Number, also known as the SATCAT, is a nine-digit sequential identifier assigned by the United States Space Command (USSPACECOM) to all artificial objects in Earth’s orbit and those that have left Earth’s orbit. It represents the order of launch or discovery and is used to track satellites and other space objects."},
                {id: 'launch-year-spec', name:'LAUNCH YEAR: ', info: "" },
                {id: 'launch-number-spec', name:'LAUNCH NUMBER: ', info: "Launch number of the year" },
                {id: 'classification-spec', name:'CLASSIFICATION: ', info: "U: Unclassified; C: Classified; S: Secret"},
            ]
        }
    },
    props: {
        tracking: {
         type: Boolean,
         required: true   
        },
        selected_satellite: {
            type: String,
            required: true
        }
    },
    watch: {

        tracking(new_value, old_value){
            
            if(new_value === true){

                // satid = "25544";
                // satname = "SPACE STATION";
                // tle = "1 25544U 98067A   24094.84846175  .00015613  00000-0  28196-3 0  9997\r\n2 25544  51.6410 323.9627 0004432  35.1300  67.4967 15.49897640447014";
                
                // https://sky-vue-api.onrender.com/tle/satellite_norad_number
                API_URL = "https://sky-vue-api.onrender.com/tle/" + this.selected_satellite;
                fetch(API_URL)
                .then((response) => response.json())
                .then((data) => {

                    satname = data.info.satname;
                    satid = data.info.satid;
                    tle = data.tle;

                    tle_line1 = tle.substring(0, tle.indexOf("\r\n"));
                    tle_line2 = tle.substring(tle.indexOf("\r\n"), tle.length);
                    
                    satellite_number = tle_line1.substring(2, 6);
                    satellite_classification = tle_line1.substring(7, 8);
        
                    satellite_launch_year = tle_line1.substring(9, 11);
                    // Converting year to 4 digits format, e.g., from 98 to 1998 and 11 to 2011.
                    // So far, it is only unambiguous before 2030.
                    if (satellite_launch_year === '') {
                    }
                    else if (Number(satellite_launch_year) < 30) {
                        satellite_launch_year = '20' + satellite_launch_year;
                    }
                    else { satellite_launch_year = '19' + satellite_launch_year;
                    }
        
                    satellite_launch_number = tle_line1.substring(11, 14);
        
                    document.getElementById('name-spec').value = satname;
                    document.getElementById('norad-spec').value = satid;
                    document.getElementById('launch-year-spec').value = satellite_launch_year;
                    document.getElementById('launch-number-spec').value = satellite_launch_number;
                    document.getElementById('classification-spec').value = satellite_classification;
    
                })
            }
        
        }
        
        

    }
})