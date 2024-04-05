app.component('specs-tab', {
    template: 
    /*html*/
    `
    <div class="display-system" id="specs-container">
        <spec v-for="spec in specs" :spec="spec"></spec>
    </div>
    `
    ,
    data() {
        return {
            specs: [
                {id: 'name-spec', name:"Name: ", info: ""},
                {id: 'norad-spec', name:'NORAD catalog number: ', info: "The NORAD Catalog Number, also known as the SATCAT, is a nine-digit sequential identifier assigned by the United States Space Command (USSPACECOM) to all artificial objects in Earth’s orbit and those that have left Earth’s orbit. It represents the order of launch or discovery and is used to track satellites and other space objects."},
                {id: 'launch-year-spec', name:'Launch year: ', info: "" },
                {id: 'launch-number-spec', name:'Launch number: ', info: "Launch number of the year" },
                {id: 'classification-spec', name:'Classification: ', info: "U: Unclassified; C: Classified; S: Secret"},
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
    updated() {
        if (this.tracking === true){

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
                if (Number(satellite_launch_year) < 30) {
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
        
        else {
            document.getElementById('name-spec').value = '';
            document.getElementById('norad-spec').value = '';
            document.getElementById('launch-year-spec').value = '';
            document.getElementById('launch-number-spec').value = '';
            document.getElementById('classification-spec').value = '';
        }

    }
})