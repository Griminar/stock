<?php

date_default_timezone_set('Europe/London');

//TODO accept params from POST and find a way to process them for a query
//set sql login details
$servername = "localhost";
$username = "dev";
$password = "cctv4568";

if (isset($_POST['client']) )
{
    $test = $_POST['client'];
    //echo $test;
}

//create PDO object
$conn = new PDO("mysql:host=$servername;dbname=devdata", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

//prepare statement
$stmt = $conn->prepare("SELECT * FROM stock");
$stmt->execute();

$xml = new SimpleXMLElement('<responseData/>');
$meta = $xml->addChild("meta",$stmt->rowCount());

while($row = $stmt->fetch(PDO::FETCH_ASSOC))
{
  $case = $xml->addChild("StockItem", $row['stockid']);
  $case->addChild("PartNumber", $row['partnumber']);
  $case->addChild("Location", $row['stockcode']);
  $case->addChild("Brand", $row['brand']);
  $case->addChild("ItemDesc", $row['itemdesc']);
  $case->addChild("CurrStock", $row['currstock']);
  $case->addChild("MinStock", $row['minstock']);
  $case->addChild("MaxStock", $row['maxstock']);
}

Header('Content-type: text/xml');

echo $xml->asXML();

?>
