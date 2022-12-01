<?php

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);
require_once('class.OracleDB.php');
$uid=$_COOKIE['uid'];

$ora=new OracleDB();
$X=new OracleDB();
$db=$ora->connectACN();


   if ( isset($_FILES["file"])) {
        if ($_FILES["file"]["error"] > 0) {
          echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
        } else {
             echo "Upload: " . $_FILES["file"]["name"] . "<br />";
             echo "Type: " . $_FILES["file"]["type"] . "<br />";
             echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
             echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br />";
             $storagename = "uploaded_bsa_file.txt";
             move_uploaded_file($_FILES["file"]["tmp_name"], $storagename);
        }      
     } else {
             echo "No file selected <br />";
             die();
     }

	if ( $file = fopen($storagename , "r" ) ) {
	    $firstline = fgets ($file, 4096 );
	    $num = strlen($firstline) - strlen(str_replace("\t", "", $firstline));
	    $fields = array();
	    $fields = explode( "\t", $firstline, ($num+1) );
	    $line = array();
	    $i = 0;
	    while ( $line[$i] = fgets ($file, 4096) ) {
	        $oneline = array();
	        $oneline = explode( "\t", $line[$i], ($num+1) );
                if ($i>1) {
                       $sql="select MEANINGLESS_KEY_SEQ.NEXTVAL AS C FROM DUAL";
                       $z=$X->sql($sql);

                       $fid=$z[0]['C'];

                       $sql = "INSERT INTO TBL_DIM_FACILITY (FACILITY_ID, REGION_ID, DISTRICT_ID, P_BEAT, BUILDING_NBR, AGENCY_BUILDING_NBR, ";
                       $sql .= " FPS_RESPONSIBLE, FSL, FACILITY_NAME, ADDRESS, CITY_NAME, STATE_ABBR, ZIPCODE, ";
	               $sql .= " POPULATION, RENTABLE_SQFT) ";
	               $sql .= " SELECT "; 
                       $sql .= $fid . ", ";                                  // FACILITY_ID
                       $sql .= $oneline[0] . ", ";                         // REGION_ID
	               $sql .= "'" . $oneline[1] . "', ";                  // DISTRICT_ID
	               $sql .= "'" . $oneline[2] . "', ";                  // P_BEAD
	               $sql .= "'" . $oneline[3] . "',";                   // BUILDING_NBR
	               $sql .= "'" . $oneline[4] . "',";                   // AGENCTY_BUILDING_NBR
	               $sql .= "'N',";                                     // FPS_RESPONSIBLE
	               $sql .= "'" . $oneline[5] . "',";                   // FSL
	               $sql .= "'" . $oneline[7] . "',";                   // FACILITY_NAME
	               $sql .= "'" . $oneline[8] . "',"; 		    // ADDRESS
	               $sql .= "'" . $oneline[9] . "',"; 
	               $sql .= "'" . $oneline[10] . "',"; 
	               $sql .= "'" . $oneline[11] . "','0','0'";                  // ZIPCODE
	               $sql .= " FROM DUAL";
	               echo $sql . ";<br>";
	               $X->execute($sql);	
	               $sql="UPDATE TBL_DIM_FACILITY SET SEGMENT_ID = 'VA', ACTIVE_FLAG = 'N' WHERE FACILITY_ID = " . $fid;
	               $X->execute($sql);	

		  }
	          $i++;
	    } //while ++

	}  //fopen

?>

