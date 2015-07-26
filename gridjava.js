	var row=1;
	var col=1;
	var cell;
	var allCells;
	var html="";
	var tRow="<tr>";
	var hClass1="class1";
	var hClass2="class2";
	var player1="<img src=\"greenp.jpg\" alt=\"Checkers Piece\" width=\"25\" height=\"25\"/>"
	var player2="<img src=\"blackp.jpg\" alt=\"Checkers Piece\" width=\"25\" height=\"25\"/>"
	var player1k="<img src=\"gkingp.jpg\" alt=\"Checkers Piece\" width=\"25\" height=\"25\"/>"
	var player2k="<img src=\"bkingp.jpg\" alt=\"Checkers Piece\" width=\"25\" height=\"25\"/>"
	var tdWhite="<td class=\""+hClass1+"\">"
	var td="</td>";
	var tdPurple="<td class=\""+hClass2+"\">";
	var tableId;
	var selected;
	var setup;
	var test;
	var two=0;
	var lpiece=5;
	var llocation=5;
	var cRow=20;
	var cCol=20;
	var p1remain=12;
	var p2remain=12;
	var eraseCell;
	var p1;
	var p2;
	var p1num;
	var p2num;
	
//the model
var gridArray=[[player1,0,player1,0,player1,0,player1,0],
	       [0,player1,0,player1,0,player1,0,player1],
               [player1,0,player1,0,player1,0,player1,0],
	       [0,0,0,0,0,0,0,0],
	       [0,0,0,0,0,0,0,0],
               [0,player2,0,player2,0,player2,0,player2],
	       [player2,0,player2,0,player2,0,player2,0],
	       [0,player2,0,player2,0,player2,0,player2],]
var gridArrayCurrent=[[3,0,3,0,3,0,3,0],
					  [0,3,0,3,0,3,0,3],
				      [3,0,3,0,3,0,3,0],
	                  [0,1,0,1,0,1,0,1],
	                  [1,0,1,0,1,0,1,0],
                      [0,2,0,2,0,2,0,2],
	                  [2,0,2,0,2,0,2,0],
	                  [0,2,0,2,0,2,0,2],]		   
var startGrid=	[[3,0,3,0,3,0,3,0],
				 [0,3,0,3,0,3,0,3],
				 [3,0,3,0,3,0,3,0],
	             [0,1,0,1,0,1,0,1],
	             [1,0,1,0,1,0,1,0],
                 [0,2,0,2,0,2,0,2],
	             [2,0,2,0,2,0,2,0],
	             [0,2,0,2,0,2,0,2],]			   
var p1Captured= new Array();
var p2Captured= new Array();	

	

function runTable()
{
	tableId= document.getElementById("tableId");
	tableId.innerHTML=genBoard(8,8);
	runScore ()
}

function genBoard(r,c)
{	
	
	for (row=1; row<=r;row++)
	{
	   html+=tRow;
		for (col=1;col<=c;col++)
		{
			if(row%2 !=0)
			{
				if(col%2 !=0)
				{
					html+=tdWhite+td;
				}
				else
				{
					html+=tdPurple+td;
				}
			}
			else
			{
				if(col%2==0)
					{
						html+=tdWhite+td;
					}
					else
					{
						html+=tdPurple+td;
					}
			
			}
		}
	}
	
	
	
	
	return html;
}

function boardSetUp ()
{	
	var p1type=document.getElementById("playerColor1");
	var p2type=document.getElementById("playerColor2");
	p1=p1type.value;
	p2=p2type.value;
	if(p1=='Green')
	{
		p1num=3;
	}
	else if(p1=='Black')
	{
		p1num=2;
	}
	if(p2=='Green')
	{
		p2num=3;
	}
	else if(p2=='Black')
	{
		p2num=2;
	}
	
	if(p1==p2)
	{
		alert("Both players can not be the same color. Select colors and press start again.");
	}
	else if (setup==1)
	{
		alert("Game is already started");
	}
	else{
	for (row=0; row<8;row++)

	{
		for (col=0;col<8;col++)
		{	
		    	
			if(gridArray[row][col]==0)
			{
				
				
			}
			
			else
			{
				cell = tableId.rows[row].cells[col];
				cell.innerHTML+=gridArray[row][col];	
				
					
			}
		}
	}
		setup=1; 
		setEventHandlers();
	}
	
	 
	
	

	
}


function setEventHandlers()
{
	
	
	allCells=tableId.getElementsByTagName("td");

	for (i=0; i<allCells.length;i++)
	{
		allCells[i].onclick=function () {col=this.cellIndex; row=this.parentNode.rowIndex;
		cell=tableId.rows[row].cells[col];updateTable();displayLoc();}
	}
	
}


function displayLoc (){
	var location=document.getElementById("location");
	location.innerHTML="";
	location.innerHTML+="</br>Green remaining:"+p1remain;
	location.innerHTML+="</br>Black remaining:"+p2remain;
	
}

function updateTable()
{
	
	
    var piece=gridArrayCurrent[row][col];
	cRow=row;
	cCol=col;
	if((lpiece != 5 && piece==2)||(lpiece != 5 && piece==4))
	{
		alert("Can not put piece on top of another piece!");
	}
	else if((lpiece != 5 && piece==3)||(lpiece != 5 && piece==6))
	{
		alert("Can not put piece on top of another piece!");
	}
	
	
	else{
		if(piece==0)
		{
			alert("Space out of play! Please selecet a diifernt place.");
		}
		else if(piece==3 || piece ==2 || piece==4 || piece==6)
		{
			cell.innerHTML="";
			gridArrayCurrent[row][col]=1;
			lRow=row;
			lCol=col;
			lpiece=piece;
		}
		
		else{
				if(lpiece==2)
				{
					if(lRow-2==row && lCol-2==col && (gridArrayCurrent[lRow-1][lCol-1]==3 ||gridArrayCurrent[lRow-1][lCol-1]==6))
					{
						gridArrayCurrent[lRow-1][lCol-1]=1;
						eraseCell=tableId.rows[lRow-1].cells[lCol-1];
						eraseCell.innerHTML="";
						p1remain=p1remain-1;
						if(row==0){
						cell.innerHTML+=player2k; 
						gridArrayCurrent[row][col]=4; 
						lpiece=5;
						}
						else{
						cell.innerHTML+=player2; 
						gridArrayCurrent[row][col]=2; 
						lpiece=5;
						}
					}
					else if(lRow-2==row && lCol+2==col && (gridArrayCurrent[lRow-1][lCol+1]==3 || gridArrayCurrent[lRow-1][lCol+1]==6))
					{
						gridArrayCurrent[lRow-1][lCol+1]=1;
						eraseCell=tableId.rows[lRow-1].cells[lCol+1];
						eraseCell.innerHTML="";
						p1remain=p1remain-1;
						if(row==0){
						cell.innerHTML+=player2k; 
						gridArrayCurrent[row][col]=4; 
						lpiece=5;
						}
						else{
						cell.innerHTML+=player2; 
						gridArrayCurrent[row][col]=2; 
						lpiece=5;
						}
					}
					else if(lRow-1==row && lCol-1==col)
					{
						if(row==0){
						cell.innerHTML+=player2k; 
						gridArrayCurrent[row][col]=4; 
						lpiece=5;
						}
						else{
						cell.innerHTML+=player2; 
						gridArrayCurrent[row][col]=2; 
						lpiece=5;
						}
					}
					else if(lRow-1==row && lCol+1==col)
					{
						if(row==0){
						cell.innerHTML+=player2k; 
						gridArrayCurrent[row][col]=4; 
						lpiece=5;
						}
						else{
						cell.innerHTML+=player2; 
						gridArrayCurrent[row][col]=2;
						lpiece=5;
						}
					}
					else
					{
						alert("Can not move there");
					}
				}
				else if(lpiece==3)
				{
					if(lRow+2==row && lCol+2==col && (gridArrayCurrent[lRow+1][lCol+1]==2||gridArrayCurrent[lRow+1][lCol+1]==4))
					{
						gridArrayCurrent[lRow+1][lCol+1]=1;
						eraseCell=tableId.rows[lRow+1].cells[lCol+1];
						eraseCell.innerHTML="";
						p2remain=p2remain-1;
						if(row==7){
						cell.innerHTML+=player1k; 
						gridArrayCurrent[row][col]=6; 
						lpiece=5;
						}
						else{
						cell.innerHTML+=player1;
						gridArrayCurrent[row][col]=3;
						lpiece=5;
						}
						
					}
					else if(lRow+2==row && lCol-2==col && (gridArrayCurrent[lRow+1][lCol-1]==2||gridArrayCurrent[lRow+1][lCol-1]==4))
					{
						gridArrayCurrent[lRow+1][lCol-1]=1;
						eraseCell=tableId.rows[lRow+1].cells[lCol-1];
						eraseCell.innerHTML="";
						p2remain=p2remain-1;
						if(row==7){
						cell.innerHTML+=player1k; 
						gridArrayCurrent[row][col]=6; 
						lpiece=5;
						}
						else{
						cell.innerHTML+=player1;
						gridArrayCurrent[row][col]=3; 
						lpiece=5;
						}
						
					}
				
					else if(lRow+1==row && lCol-1==col)
					{
						if(row==7){
						cell.innerHTML+=player1k; 
						gridArrayCurrent[row][col]=6; 
						lpiece=5;
						}
						else{
						cell.innerHTML+=player1; 
						gridArrayCurrent[row][col]=3;
						lpiece=5;
						}
					}
					else if(lRow+1==row && lCol+1==col)
					{
						if(row==7){
						cell.innerHTML+=player1k; 
						gridArrayCurrent[row][col]=6; 
						lpiece=5;
						}
						else{
						cell.innerHTML+=player1;
						gridArrayCurrent[row][col]=3;
						lpiece=5;
						}
					}
					else
					{
						alert("Can not move there");
					}
				}
				else if(lpiece==4)
				{
					if((lRow+1==row && lCol+1==col)||(lRow+1==row && lCol-1==col)||(lRow-1==row && lCol-1==col)||(lRow-1==row && lCol+1==col))
					{
						cell.innerHTML+=player2k; 
						gridArrayCurrent[row][col]=4; 
						lpiece=5;
					}
					else if((lRow+2==row && lCol+2==col)&&(gridArrayCurrent[lRow+1][lCol+1]==3||gridArrayCurrent[lRow+1][lCol+1]==6))
					{	
						gridArrayCurrent[lRow+1][lCol+1]=1;
						eraseCell=tableId.rows[lRow+1].cells[lCol+1];
						eraseCell.innerHTML="";
						p1remain=p1remain-1;
					
						cell.innerHTML+=player2k;
						gridArrayCurrent[row][col]=4; 
						lpiece=5;
					}
					else if((lRow+2==row && lCol-2==col)&&(gridArrayCurrent[lRow+1][lCol-1]==3||gridArrayCurrent[lRow+1][lCol-1]==6))
					{
						gridArrayCurrent[lRow+1][lCol-1]=1;
						eraseCell=tableId.rows[lRow+1].cells[lCol-1];
						eraseCell.innerHTML="";
						p1remain=p1remain-1;
					
						cell.innerHTML+=player2k;
						gridArrayCurrent[row][col]=4; 
						lpiece=5;
					}
					else if((lRow-2==row && lCol-2==col)&&(gridArrayCurrent[lRow-1][lCol-1]==3||gridArrayCurrent[lRow-1][lCol-1]==6))
					{
						gridArrayCurrent[lRow-1][lCol-1]=1;
						eraseCell=tableId.rows[lRow-1].cells[lCol-1];
						eraseCell.innerHTML="";
						p1remain=p1remain-1;
					
						cell.innerHTML+=player2k;
						gridArrayCurrent[row][col]=4; 
						lpiece=5;
					}
					else if((lRow-2==row && lCol+2==col)&&(gridArrayCurrent[lRow-1][lCol+1]==3||gridArrayCurrent[lRow-1][lCol+1]==6))
					{
						gridArrayCurrent[lRow-1][lCol+1]=1;
						eraseCell=tableId.rows[lRow-1].cells[lCol+1];
						eraseCell.innerHTML="";
						p1remain=p1remain-1;
					
						cell.innerHTML+=player2k;
						gridArrayCurrent[row][col]=4; 
						lpiece=5;
					}
					else
					{
						alert("Can not move there");
					}
				}
				else if(lpiece==6)
				{
					if((lRow+1==row && lCol+1==col)||(lRow+1==row && lCol-1==col)||(lRow-1==row && lCol-1==col)||(lRow-1==row && lCol+1==col))
					{
						cell.innerHTML+=player1k; 
						gridArrayCurrent[row][col]=6; 
						lpiece=5;
					}
					else if((lRow+2==row && lCol+2==col)&&(gridArrayCurrent[lRow+1][lCol+1]==4||gridArrayCurrent[lRow+1][lCol+1]==2))
					{	
						gridArrayCurrent[lRow+1][lCol+1]=1;
						eraseCell=tableId.rows[lRow+1].cells[lCol+1];
						eraseCell.innerHTML="";
						p2remain=p2remain-1;
					
						cell.innerHTML+=player1k;
						gridArrayCurrent[row][col]=6; 
						lpiece=5;
					}
					else if((lRow+2==row && lCol-2==col)&&(gridArrayCurrent[lRow+1][lCol-1]==2||gridArrayCurrent[lRow+1][lCol-1]==4))
					{
						gridArrayCurrent[lRow+1][lCol-1]=1;
						eraseCell=tableId.rows[lRow+1].cells[lCol-1];
						eraseCell.innerHTML="";
						p2remain=p2remain-1;
					
						cell.innerHTML+=player1k;
						gridArrayCurrent[row][col]=6; 
						lpiece=5;
					}
					else if((lRow-2==row && lCol-2==col)&&(gridArrayCurrent[lRow-1][lCol-1]==2||gridArrayCurrent[lRow-1][lCol-1]==4))
					{
						gridArrayCurrent[lRow-1][lCol-1]=1;
						eraseCell=tableId.rows[lRow-1].cells[lCol-1];
						eraseCell.innerHTML="";
						p2remain=p2remain-1;
					
						cell.innerHTML+=player1k;
						gridArrayCurrent[row][col]=6; 
						lpiece=5;
					}
					else if((lRow-2==row && lCol+2==col)&&(gridArrayCurrent[lRow-1][lCol+1]==2||gridArrayCurrent[lRow-1][lCol+1]==4))
					{
						gridArrayCurrent[lRow-1][lCol+1]=1;
						eraseCell=tableId.rows[lRow-1].cells[lCol+1];
						eraseCell.innerHTML="";
						p2remain=p2remain-1;
					
						cell.innerHTML+=player1k;
						gridArrayCurrent[row][col]=6; 
						lpiece=5;
					}
					else
					{
						alert("Can not move there");
					}
				}
			}
				
		}
	if(p1remain==0 || p2remain==0)
	{
		if (p1remain==0){alert("Game over! Player 1 wins!!!");}
		else{alert("Game over! Player 2 wins!!!");}
	}
}

function clearTable ()
{

	for (row=0; row<8;row++)
	{
		for (col=0;col<8;col++)
		{
			if(row%2 !=0)
			{
				if(col%2 !=0)
				{
					cell = tableId.rows[row].cells[col];
					cell.innerHTML="";	
					cell.style.backgroundColor="white"
					gridArrayCurrent[row][col]=startGrid[row][col];
				}
				else
				{
					cell = tableId.rows[row].cells[col];
					cell.innerHTML="";	
					cell.style.backgroundColor="purple"
					gridArrayCurrent[row][col]=startGrid[row][col];
				}
			}
			else
			{
				if(col%2==0)
					{
						cell = tableId.rows[row].cells[col];
						cell.innerHTML="";	
						cell.style.backgroundColor="white"
						gridArrayCurrent[row][col]=startGrid[row][col];
					}
					else
					{
						cell = tableId.rows[row].cells[col];
						cell.innerHTML="";	
						cell.style.backgroundColor="purple"
						gridArrayCurrent[row][col]=startGrid[row][col];
					}
			
			}
		}
	}
	
 
	gridArray=[[player1,0,player1,0,player1,0,player1,0],
	       [0,player1,0,player1,0,player1,0,player1],
               [player1,0,player1,0,player1,0,player1,0],
	       [0,0,0,0,0,0,0,0],
	       [0,0,0,0,0,0,0,0],
               [0,player2,0,player2,0,player2,0,player2],
	       [player2,0,player2,0,player2,0,player2,0],
	       [0,player2,0,player2,0,player2,0,player2],];
	setup=0;
	lpiece=5;
	cRow=20;
	cCol=20;
	p1remain=12;
	p2remain=12;
	
		
}

// LOG IN CODING----------------------------------------------------------------------
function logIn ()
{
	var userName=document.getElementById("playerName").value;
	var password=document.getElementById("playerPassword").value;
	loadSyncPost(userName,password);
	

}

function loadSyncPost(uName,pAss) {
 
    var data = "userName=" + uName+"&password="+pAss;
    var localRequest = new XMLHttpRequest();

   
    localRequest.open("POST","http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php", false);
    localRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    localRequest.send(data);

 
    if (localRequest.status == 200) {
	var dataDiv = document.getElementById("validate");
	var invalid="invalid";
	var responseJson = JSON.parse(localRequest.responseText);
	if (responseJson["result"]==invalid){dataDiv.innerHTML = "Your user name and password are " + responseJson["result"];}
	else{var logInInfo=responseJson["userName"]+" "+responseJson["timestamp"];
	localStorage.t2550timestamp=logInInfo; window.open("gridpage.html")}
    }
}
function runLogIn ()
{
	var div=document.getElementById("longInDiv");
	div.innerHTML="LOG IN INFO: "+localStorage.t2550timestamp;
}
function clearF ()
{
	document.getElementById("playerName").value="";
	document.getElementById("playerPassword").value="";
	localStorage.clear();
}
//------------------------------------------------------------------------

function runScore ()
{
	var req= new XMLHttpRequest();
	req.open("GET","xmldoc.xml",false);
	req.send(null);
	
	var xmldoc=req.responseXML;
	player1=document.getElementById("1score");
	player2=document.getElementById("2score");

	player1.innerHTML+=" "+xmldoc.getElementsByTagName("current")[0].childNodes[0].nodeValue;
	player2.innerHTML+=" "+xmldoc.getElementsByTagName("current")[1].childNodes[0].nodeValue;
}   