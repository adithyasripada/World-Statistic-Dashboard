//LAB 4 DATA VISUALATION & ANALYTICS

//This coursework is about showing & demonstrating our knowledge learned from the lectures and previous labs to display a 
//sufficiently complex, interactive and animated while containing multiple different graphical output.

// GenderImbalance.js is the file resposible for showing a comparison between males and females for each country on the map 
// The colours on the screen is based on the ratio of males to females on the map.
// This was calculated by divinf the female population from the male population.

//----------------------------------------CODE BELOW--------------------------------------------------------------------------------------------------

function displayGenderImbalance() {

    // //color scale for population density
    const densityScale = d3.scaleThreshold()
        .domain([80, 85, 90, 95, 100, 105, 110, 115, 120])
        .range(d3.schemeBlues[9]);


    // //Loading data externally, JSON and CSV format and processing data to select needed data
    Promise.all([
        d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
        d3.csv("https://raw.githubusercontent.com/adithyasripada/DV-A/main/mergedpopulationds.csv", function (d) {
            map.set(d.code, ((+d.PopMale)/(+d.PopFemale)*100))
            console.log(( (+d.PopMale)/(+d.PopFemale)*100))
        }),
    ]).then(function (loadData) {
        let topo = loadData[0]

        // //Drawing the map
        svg.append("g")
            .selectAll("path")
            .data(topo.features)
            .join("path")
            // //drawing each country
            .attr("d", d3.geoPath()
                .projection(map_type)
            )
            // //set the color for each country based on the density values
            .attr("fill", function (d) {
                d.PopDensity = map.get(d.id) || 0;
                return densityScale(d.PopDensity);
            })
            .attr("stroke", "black")
            .attr("stroke-width", "0.5")
            .on('click', clicked)
         })

    }