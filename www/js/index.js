/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
}

 	
$(document).on("pagecreate", "#homePage", function() {
    //add element
    $('#add').on("click", function() {
        var list = $('[data-role="listview"]');
        var newItemName = prompt("Ingrese el nombre del nuevo elemento:", "Nombre");
        
        if (newItemName !== null && newItemName !== "") {
            var newListItem = $('<li><a href="#"><button class="deleteButton">X</button><button class="editButton">!</button>' + " " + newItemName + '</a></li>').appendTo(list);
            list.listview('refresh');
        }
    });
    //add buttons to all elements 
    $('[data-role="listview"] li').each(function() {
        var $this = $(this);
        if (!$this.find('.deleteButton').length) {
            var itemName = $this.find('a').text();
            $this.html('<a href="#"><button class="deleteButton">X</button><button class="editButton">!</button>' + " " + itemName + '</a>');
        }$('[data-role="listview"]').listview('refresh');
    });
  

    
    // delete element
    $(document).on("click", ".deleteButton", function() {
        var listItem = $(this).closest('li');
        listItem.remove();
        $('[data-role="listview"]').listview('refresh');
    });

    //edit element with prompt
    /*$(document).on("click", ".editButton", function() {
        var listItem = $(this).closest('li');
        var newItemName = prompt("Ingrese el nuevo nombre:");
        listItem.find('a').text("");
        var buttonsHTML = '<button class="deleteButton">X</button><button class="editButton">!</button>';
        listItem.find('a').prepend(buttonsHTML + " " + newItemName);
        $('[data-role="listview"]').listview('refresh');
    });*/

    //edit element with input
    $(document).on("click", ".editButton", function() {
        var listItem = $(this).closest('li');
        var newItem = $('<input type="text" placeholder="Nuevo nombre">').val(listItem.find('a').clone().children().remove().end().text());
        var okButton = $('<button class="okButton">OK</button>');
        listItem.find('a').text("").append(newItem, okButton);

        $(document).on("click", ".okButton", function(){

            var buttonsHTML = '<button class="deleteButton">X</button><button class="editButton">!</button>';
            var newItemName = newItem.val()
            // Reemplazar el texto con el input y los botones
            listItem.find('a').empty().append(newItemName).prepend(buttonsHTML);
            
            // Refrescar la lista después de realizar los cambios
            $('[data-role="listview"]').listview('refresh');
        })
        
    });
});

  