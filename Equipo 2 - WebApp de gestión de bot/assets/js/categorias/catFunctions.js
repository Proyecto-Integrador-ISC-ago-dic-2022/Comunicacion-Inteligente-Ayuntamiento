    function createTable(array) {
      catArray = []
      fetch('http://127.0.0.1:8080/artefactos/readCatStatus').then((result) => result.json()).then(function (data) {
        for (i in data) {
          if (data[i] == 0) {
            catArray.push([i, false])
          } else {
            catArray.push([i, true])
          }

        }
        var table = document.getElementById('table-areas');
        var tableBody = document.getElementById('table-areas-body');
        catArray.forEach(function (rowData) {
          var div = document.createElement('div');
          div.className = 'd-flex flex-column justify-content-center'
          var row = document.createElement('tr');
          var cell = document.createElement('td');
          cell.className = 'px-5'
          cell.appendChild(document.createTextNode(rowData[0]));
          row.appendChild(cell)
          var toggleDiv = document.createElement('div');
          toggleDiv.className = 'form-check form-switch mx-7'
          var toggleCell = document.createElement('td');
          var toggle = document.createElement("input");
          toggle.className = "form-check-input";
          toggle.type = "checkbox";
          toggle.id = rowData[0]
          toggle.name = rowData[0]
          toggle.checked = rowData[1];
          toggleDiv.appendChild(toggleCell);
          toggleCell.appendChild(toggle);
          row.appendChild(toggleDiv);
          /*rowData.forEach(function (cellData) {
            var cell = document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
            
          });*/
          tableBody.appendChild(row);
        });
        table.appendChild(tableBody);
      })


    }
    createTable()