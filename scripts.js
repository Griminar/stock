function loadNavBar()
{
  //generates and loads the navbar to simplyfy editing it
  var navbar = `
  <div id="nav-bar" class="w3-bar w3-black">
    <a href="index.htm" class="w3-bar-item w3-button">Home</a>
    <div class="w3-dropdown-hover">
    <button class="w3-button">Stock Control</button>
    <div class="w3-dropdown-content w3-bar-block w3-card-4">
      <a href="viewStock.htm" class="w3-bar-item w3-button">View Stock</a>
      <a href="checkOut.htm" class="w3-bar-item w3-button">Check Out Stock</a>
      <a href="" class="w3-bar-item w3-button">Adjust Stock(WIP)</a>
      <a href="" class="w3-bar-item w3-button">Generate Order Report(WIP)</a>
    </div>
  </div>
  </div>
  `;
  document.getElementById("navph").innerHTML = navbar;
}

function showModal()
{
  document.getElementById('id01').style.display='block';
}

function showModalShelf()
{
  //document.getElementById('id01').style.display='block';
  //document.getElementById('modalCont').innerHTML = "Shelf Code Search";
  if(document.getElementsByName('shelfCode')[0].value != "")
  {
    var url = "/viewItem.htm?shelfCode=" + document.getElementsByName('shelfCode')[0].value;
    window.open(url,"_self");
  }
  else {
    //nothing
  }
}

function showModalKeyword()
{
  //document.getElementById('id01').style.display='block';
  //document.getElementById('modalCont').innerHTML = "Keyword Search";

  document.getElementById('stockSearch').innerHTML = "<br><br><div id= 'stockDiv'></div>"
  fetchParseStock(document.getElementsByName('keyword')[0].value);
}

function fetchParseStock(searchDesc)
{
  //+"&";
  //searchDesc = "Test";
  //set ajax xmlhttp
  var xhttp = new XMLHttpRequest();
  var url = "loadStock.php";

  if (typeof searchDesc !== 'undefined') { var params = "searchDesc=" + searchDesc;  }

  console.log("Prepareing Request");
  //TODO parse param string
  xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            //console.log("response");

                console.log(xhttp.responseText);

                document.getElementById("stockDiv").innerHTML =
                `<table border = "1" id="stockTable" class="w3-table-all w3-hoverable">
                <tr>
                  <th>Stock ID</th>
                  <th>Part Number</th>
                  <th>Location</th>
                  <th>Brand</th>
                  <th>Item Description</th>
                  <th>Current Stock</th>
                  <th>Minimum Stock</th>
                  <th>Maximum Stock</th>
                </table>`;

                  var parser, xmlDoc;
                  parser = new DOMParser();
                  xmlDoc = parser.parseFromString(xhttp.responseText,"text/xml");
                  var meta = xmlDoc.getElementsByTagName("meta")[0].childNodes[0].nodeValue;
                  meta++;
                  var x = document.getElementById("stockTable");
                  for(i = 1;i<meta;i++)
                  {

                    /*
                    if(resolveCaseStatus(xmlDoc.getElementsByTagName("CaseStatus")[i-1].childNodes[0].nodeValue) == "Resolved")
                    {
                      var row1 = y.insertRow(resCount);
                      resCount++;
                    }
                    else {
                      var row1 = x.insertRow(openCount);
                      openCount++
                    }

                    */

                    var row1 = x.insertRow(i);

                    var cell1 = row1.insertCell(0);
                    var cell2 = row1.insertCell(1);
                    var cell3 = row1.insertCell(2);
                    var cell4 = row1.insertCell(3);
                    var cell5 = row1.insertCell(4);
                    var cell6 = row1.insertCell(5);
                    var cell7 = row1.insertCell(6);
                    var cell8 = row1.insertCell(7);

                    cell1.innerHTML = xmlDoc.getElementsByTagName("StockItem")[i-1].childNodes[0].nodeValue;
                    cell2.innerHTML = xmlDoc.getElementsByTagName("PartNumber")[i-1].childNodes[0].nodeValue;
                    cell3.innerHTML = xmlDoc.getElementsByTagName("Location")[i-1].childNodes[0].nodeValue;
                    cell4.innerHTML = xmlDoc.getElementsByTagName("Brand")[i-1].childNodes[0].nodeValue;
                    cell5.innerHTML = xmlDoc.getElementsByTagName("ItemDesc")[i-1].childNodes[0].nodeValue;
                    cell6.innerHTML = xmlDoc.getElementsByTagName("CurrStock")[i-1].childNodes[0].nodeValue;
                    cell7.innerHTML = xmlDoc.getElementsByTagName("MinStock")[i-1].childNodes[0].nodeValue;
                    cell8.innerHTML = xmlDoc.getElementsByTagName("MaxStock")[i-1].childNodes[0].nodeValue;
                    //colours

                    //colour for priority

                    if(xmlDoc.getElementsByTagName("CurrStock")[i-1].childNodes[0].nodeValue < xmlDoc.getElementsByTagName("MaxStock")[i-1].childNodes[0].nodeValue)
                    {
                      cell1.style.backgroundColor = "#F83C3C";
                      cell2.style.backgroundColor = "#F83C3C";
                      cell3.style.backgroundColor = "#F83C3C";
                      cell4.style.backgroundColor = "#F83C3C";
                      cell5.style.backgroundColor = "#F83C3C";
                      cell6.style.backgroundColor = "#F83C3C";
                      cell7.style.backgroundColor = "#F83C3C";
                      cell8.style.backgroundColor = "#F83C3C";
                    }

                    /*
                    if(resolveCaseStatus(xmlDoc.getElementsByTagName("CaseStatus")[i-1].childNodes[0].nodeValue) == "Resolved" )
                    {
                      cell1.style.backgroundColor = "#CEF6CE";
                      cell2.style.backgroundColor = "#CEF6CE";
                      cell3.style.backgroundColor = "#CEF6CE";
                      cell4.style.backgroundColor = "#CEF6CE";
                      cell5.style.backgroundColor = "#CEF6CE";
                      cell6.style.backgroundColor = "#CEF6CE";
                      cell7.style.backgroundColor = "#CEF6CE";
                      cell8.style.backgroundColor = "#CEF6CE";
                      cell9.style.backgroundColor = "#CEF6CE";
                    }
                  }
                  */
        }
      }
    };

    xhttp.open("POST",url,true);

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.send(params);

    console.log("request sent");
}

function fetchStock(searchDesc)
{
  //+"&";
  //searchDesc = "Test";
  //set ajax xmlhttp
  var xhttp = new XMLHttpRequest();
  var url = "loadStock.php";

  if (typeof searchDesc !== 'undefined') { var params = "searchDesc=" + searchDesc;  }

  console.log("Prepareing Request");
  //TODO parse param string
  xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            //console.log("response");

                console.log(xhttp.responseText);

                document.getElementById("stockDiv").innerHTML =
                `<table border = "1" id="stockTable" class="w3-table-all w3-hoverable">
                <tr>
                  <th>Stock ID</th>
                  <th>Part Number</th>
                  <th>Location</th>
                  <th>Brand</th>
                  <th>Item Description</th>
                  <th>Current Stock</th>
                  <th>Minimum Stock</th>
                  <th>Maximum Stock</th>
                </table>`;

                  var parser, xmlDoc;
                  parser = new DOMParser();
                  xmlDoc = parser.parseFromString(xhttp.responseText,"text/xml");
                  var meta = xmlDoc.getElementsByTagName("meta")[0].childNodes[0].nodeValue;
                  meta++;
                  var x = document.getElementById("stockTable");
                  for(i = 1;i<meta;i++)
                  {

                    /*
                    if(resolveCaseStatus(xmlDoc.getElementsByTagName("CaseStatus")[i-1].childNodes[0].nodeValue) == "Resolved")
                    {
                      var row1 = y.insertRow(resCount);
                      resCount++;
                    }
                    else {
                      var row1 = x.insertRow(openCount);
                      openCount++
                    }

                    */

                    var row1 = x.insertRow(i);

                    var cell1 = row1.insertCell(0);
                    var cell2 = row1.insertCell(1);
                    var cell3 = row1.insertCell(2);
                    var cell4 = row1.insertCell(3);
                    var cell5 = row1.insertCell(4);
                    var cell6 = row1.insertCell(5);
                    var cell7 = row1.insertCell(6);
                    var cell8 = row1.insertCell(7);

                    cell1.innerHTML = xmlDoc.getElementsByTagName("StockItem")[i-1].childNodes[0].nodeValue;
                    cell2.innerHTML = xmlDoc.getElementsByTagName("PartNumber")[i-1].childNodes[0].nodeValue;
                    cell3.innerHTML = xmlDoc.getElementsByTagName("Location")[i-1].childNodes[0].nodeValue;
                    cell4.innerHTML = xmlDoc.getElementsByTagName("Brand")[i-1].childNodes[0].nodeValue;
                    cell5.innerHTML = xmlDoc.getElementsByTagName("ItemDesc")[i-1].childNodes[0].nodeValue;
                    cell6.innerHTML = xmlDoc.getElementsByTagName("CurrStock")[i-1].childNodes[0].nodeValue;
                    cell7.innerHTML = xmlDoc.getElementsByTagName("MinStock")[i-1].childNodes[0].nodeValue;
                    cell8.innerHTML = xmlDoc.getElementsByTagName("MaxStock")[i-1].childNodes[0].nodeValue;
                    //colours

                    //colour for priority

                    if(xmlDoc.getElementsByTagName("CurrStock")[i-1].childNodes[0].nodeValue < xmlDoc.getElementsByTagName("MaxStock")[i-1].childNodes[0].nodeValue)
                    {
                      cell1.style.backgroundColor = "#F83C3C";
                      cell2.style.backgroundColor = "#F83C3C";
                      cell3.style.backgroundColor = "#F83C3C";
                      cell4.style.backgroundColor = "#F83C3C";
                      cell5.style.backgroundColor = "#F83C3C";
                      cell6.style.backgroundColor = "#F83C3C";
                      cell7.style.backgroundColor = "#F83C3C";
                      cell8.style.backgroundColor = "#F83C3C";
                    }

                    /*
                    if(resolveCaseStatus(xmlDoc.getElementsByTagName("CaseStatus")[i-1].childNodes[0].nodeValue) == "Resolved" )
                    {
                      cell1.style.backgroundColor = "#CEF6CE";
                      cell2.style.backgroundColor = "#CEF6CE";
                      cell3.style.backgroundColor = "#CEF6CE";
                      cell4.style.backgroundColor = "#CEF6CE";
                      cell5.style.backgroundColor = "#CEF6CE";
                      cell6.style.backgroundColor = "#CEF6CE";
                      cell7.style.backgroundColor = "#CEF6CE";
                      cell8.style.backgroundColor = "#CEF6CE";
                      cell9.style.backgroundColor = "#CEF6CE";
                    }
                  }
                  */
        }
      }
    };

    xhttp.open("POST",url,true);

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.send(params);

    console.log("request sent");
}

function fetchStockItem(shelfCode)
{
  //+"&";
  //searchDesc = "Test";
  //set ajax xmlhttp
  var xhttp = new XMLHttpRequest();
  var url = "loadStock.php";

  if (typeof shelfCode === 'undefined') {
    console.log("Error, no shelf code specified");
  }
  else {
    var params = "shelfCode" + shelfCode;

    console.log("Prepareing Request");
    //TODO parse param string
    xhttp.onreadystatechange = function(){
          if(this.readyState == 4 && this.status == 200){
              //console.log("response");

                  console.log(xhttp.responseText);

                    var parser, xmlDoc;
                    parser = new DOMParser();
                    xmlDoc = parser.parseFromString(xhttp.responseText,"text/xml");
                    var meta = xmlDoc.getElementsByTagName("meta")[0].childNodes[0].nodeValue;
                    meta++;
                    for(i = 1;i<meta;i++)
                    {

                      /*
                      if(resolveCaseStatus(xmlDoc.getElementsByTagName("CaseStatus")[i-1].childNodes[0].nodeValue) == "Resolved")
                      {
                        var row1 = y.insertRow(resCount);
                        resCount++;
                      }
                      else {
                        var row1 = x.insertRow(openCount);
                        openCount++
                      }

                      */
          }
        }
      };

      xhttp.open("POST",url,true);

      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      xhttp.send(params);

      console.log("request sent");
  }


}
