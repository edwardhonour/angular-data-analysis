<?php
//---------------------------------------------------------------------
// Main API Router for this angular directory.
// Author:  Edward Honour
// Date: 07/18/2021
//---------------------------------------------------------------------

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type, Authorization');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS');
header('Content-type: application/json');

require_once('class.OracleDB.php');

$uid=$_COOKIE['uid'];

$X=new OracleDB();
$db=$X->connectACN();

// Require and initialize the class libraries necessary for this module. Code
// specific for your application goes in here.

//=======================================================================================
// APPLICATION SPECIFIC CODE BELOW - CONNECT STRING CODE ABOVE
//=======================================================================================

class MIST {

    public $X;
    public $json;
    public $arr;
    function __construct() {
         $this->X=new OracleDB();
    }

    function getUser($data) {
            if (!isset($data['uid'])) $data['uid']="55009";
            if ($data['uid']=="") $data['uid']="55009";
            $sql="select * from FPS_USER WHERE USER_ID = " . $data['uid'];
            $user=$this->X->sql($sql);
            $u=array();
            if (sizeof($user)==0) {
                    $u['forced_off']=1;
            } else {
                    $u=$user[0];
                    $u['forced_off']=0;
            }
            return $u;
    }
function getSQL($data) {
     $sql=$data['sql'];
     $list=$this->X->sql($sql);
     $output=array();
     $output['list']=$list;
     return $output;
}


    function isJSON($string){
       return is_string($string) && is_array(json_decode($string, true)) ? true : false;
    }

    function makeDefault() {
        $arr=array();
        $arr['type']="doc";
        $c=array();
        $d=array();
        array_push($c,$d);
        $arr['content']=$d;
        return $arr;
    }

function getHomePage($data) {
      $output=array();
      $user=$this->getUser($data);
      $output['user']=$user;
      return $output;
}

function postEditTenantGroup($d) {
        $data=$d['data'];
        $post=array();
        $post['table_name']="FPS_TENANT_GROUP";
        $post['ID']=$data['ID'];
        $post['TENANT_GROUP']=$data['TENANT_GROUP'];
        $post['GROUP_NAME']=$data['GROUP_NAME'];

        if ($data['LN']=='IN') {
            $subquery="(SELECT DISTINCT BUILDING_NUMBER FROM REXUS_TENANTS WHERE AGENCY_CODE IN (";
            if ($data['AGENCY_1']!='') $subquery.="'" . $data['AGENCY_1'] . "'";
            if ($data['AGENCY_2']!='') $subquery.=",'" . $data['AGENCY_2'] . "'";
            if ($data['AGENCY_3']!='') $subquery.=",'" . $data['AGENCY_3'] . "'";
            if ($data['AGENCY_4']!='') $subquery.=",'" . $data['AGENCY_4'] . "'";
            if ($data['AGENCY_5']!='') $subquery.=",'" . $data['AGENCY_5'] . "'";
            if ($data['AGENCY_6']!='') $subquery.=",'" . $data['AGENCY_6'] . "'";
            if ($data['AGENCY_7']!='') $subquery.=",'" . $data['AGENCY_7'] . "'";
            if ($data['AGENCY_8']!='') $subquery.=",'" . $data['AGENCY_8'] . "'";
            if ($data['AGENCY_9']!='') $subquery.=",'" . $data['AGENCY_9'] . "'";
            if ($data['AGENCY_10']!='') $subquery.=",'" . $data['AGENCY_10'] . "'";
            if ($data['AGENCY_11']!='') $subquery.=",'" . $data['AGENCY_11'] . "'";
            if ($data['AGENCY_12']!='') $subquery.=",'" . $data['AGENCY_12'] . "'";
            $subquery.=")"; 
        } else {
           $subquery="(SELECT DISTINCT BUILDING_NUMBER FROM REXUS_TENANTS WHERE AGENCY_CODE LIKE '" . $data['AGENCY_1'] . "')";
        }

        $post['SUBQUERY']=$subquery;
        $this->X->post($post); 

        $sql="delete from FPS_TENANT_GROUP_AGENCY WHERE TENANT_GROUP = '" . $data['TENANT_GROUP'] . "'";
        $this->X->execute($sql);

if ($data['LN']=='IN') {    
        if ($data['AGENCY_1']!='') {
                $sql="INSERT INTO FPS_TENANT_GROUP_AGENCY (TENANT_GROUP, AGENCY_CODE) VALUES ('" . $data['TENANT_GROUP'] . "','" . $data['AGENCY_1'] . "')";
                $this->X->execute($sql);
        }
        if ($data['AGENCY_2']!='') {
                $sql="INSERT INTO FPS_TENANT_GROUP_AGENCY (TENANT_GROUP, AGENCY_CODE) VALUES ('" . $data['TENANT_GROUP'] . "','" . $data['AGENCY_2'] . "')";
                $this->X->execute($sql);
        }
        if ($data['AGENCY_3']!='') {
                $sql="INSERT INTO FPS_TENANT_GROUP_AGENCY (TENANT_GROUP, AGENCY_CODE) VALUES ('" . $data['TENANT_GROUP'] . "','" . $data['AGENCY_3'] . "')";
                $this->X->execute($sql);
        }
        if ($data['AGENCY_4']!='') {
                $sql="INSERT INTO FPS_TENANT_GROUP_AGENCY (TENANT_GROUP, AGENCY_CODE) VALUES ('" . $data['TENANT_GROUP'] . "','" . $data['AGENCY_4'] . "')";
                $this->X->execute($sql);
        }
        if ($data['AGENCY_5']!='') {
                $sql="INSERT INTO FPS_TENANT_GROUP_AGENCY (TENANT_GROUP, AGENCY_CODE) VALUES ('" . $data['TENANT_GROUP'] . "','" . $data['AGENCY_5'] . "')";
                $this->X->execute($sql);
        }
        if ($data['AGENCY_6']!='') {
                $sql="INSERT INTO FPS_TENANT_GROUP_AGENCY (TENANT_GROUP, AGENCY_CODE) VALUES ('" . $data['TENANT_GROUP'] . "','" . $data['AGENCY_6'] . "')";
                $this->X->execute($sql);
        }
        if ($data['AGENCY_7']!='') {
                $sql="INSERT INTO FPS_TENANT_GROUP_AGENCY (TENANT_GROUP, AGENCY_CODE) VALUES ('" . $data['TENANT_GROUP'] . "','" . $data['AGENCY_7'] . "')";
                $this->X->execute($sql);
        }
        if ($data['AGENCY_8']!='') {
                $sql="INSERT INTO FPS_TENANT_GROUP_AGENCY (TENANT_GROUP, AGENCY_CODE) VALUES ('" . $data['TENANT_GROUP'] . "','" . $data['AGENCY_8'] . "')";
                $this->X->execute($sql);
        }
       if ($data['AGENCY_9']!='') {
                $sql="INSERT INTO FPS_TENANT_GROUP_AGENCY (TENANT_GROUP, AGENCY_CODE) VALUES ('" . $data['TENANT_GROUP'] . "','" . $data['AGENCY_9'] . "')";
                $this->X->execute($sql);
        }
        if ($data['AGENCY_10']!='') {
                $sql="INSERT INTO FPS_TENANT_GROUP_AGENCY (TENANT_GROUP, AGENCY_CODE) VALUES ('" . $data['TENANT_GROUP'] . "','" . $data['AGENCY_10'] . "')";
                $this->X->execute($sql);
        }
        if ($data['AGENCY_11']!='') {
                $sql="INSERT INTO FPS_TENANT_GROUP_AGENCY (TENANT_GROUP, AGENCY_CODE) VALUES ('" . $data['TENANT_GROUP'] . "','" . $data['AGENCY_11'] . "')";
                $this->X->execute($sql);
        }
        if ($data['AGENCY_12']!='') {
                $sql="INSERT INTO FPS_TENANT_GROUP_AGENCY (TENANT_GROUP, AGENCY_CODE) VALUES ('" . $data['TENANT_GROUP'] . "','" . $data['AGENCY_12'] . "')";
                $this->X->execute($sql);
        }
} else {
   $sql="INSERT INTO FPS_TENANT_GROUP_AGENCY (TENANT_GROUP, AGENCY_CODE) SELECT '" . $data['TENANT_GROUP'] . "', AGENCY_CODE FROM REXUS_TENANTS WHERE ";
   $sql.=" AGENCY_CODE LIKE '" . $data['AGENCY_1'] . "'";
   $this->X->execute($sql);
}

$output=array();
        $output['error_code']="0";
        return $output;
}

    function getEditTenantGroup($data) {
            $output=array();
            $user=$this->getUser($data);
            $id=$data['id'];
            $output['user']=$user;
            if ($id=='0') {
                    $formData=array();
                    $formData['ID']="";
                    $formData['GROUP_NAME']="";
                    $formData['TENANT_GROUP']="";
		    $formData['LN']="IN";
                    $formData['AGENCY_1']="";
                    $formData['AGENCY_2']="";
                    $formData['AGENCY_3']="";
                    $formData['AGENCY_4']="";
                    $formData['AGENCY_5']="";
                    $formData['AGENCY_6']="";
                    $formData['AGENCY_7']="";
                    $formData['AGENCY_8']="";
                    $formData['AGENCY_9']="";
                    $formData['AGENCY_10']="";
                    $formData['AGENCY_11']="";
                    $formData['AGENCY_12']="";
             } else {
                    $formData=array();
                    $sql="select ID, TENANT_GROUP, GROUP_NAME, SUBQUERY from FPS_TENANT_GROUP WHERE ID = " . $id;
                    $f=$this->X->sql($sql);
                    $formData=$f[0];
			if (strpos($f[0]['SUBQUERY'],"LIKE")) {
			$formData['LN']="LIKE";

                        $t=$f[0]['SUBQUERY'];
                        $a=strpos($t,"'");
                        $b=strpos($t,"'",$a+1);
			$len=$b-$a-1;
                        $formData['AGENCY_1']=substr($t,$a+1,$len);

			} else {
                        $formData['LN']="IN";
			$formData['AGENCY_1']="";
                    }

                    
 
                    $formData['AGENCY_2']="";
                    $formData['AGENCY_3']="";
                    $formData['AGENCY_4']="";
                    $formData['AGENCY_5']="";
                    $formData['AGENCY_6']="";
                    $formData['AGENCY_7']="";
                    $formData['AGENCY_8']="";
                    $formData['AGENCY_9']="";
                    $formData['AGENCY_10']="";
                    $formData['AGENCY_11']="";
                    $formData['AGENCY_12']="";
                    if ($formData['LN']=='IN') {
                        $sql="select AGENCY_CODE FROM FPS_TENANT_GROUP_AGENCY WHERE TENANT_GROUP = '" . $formData['TENANT_GROUP'] . "' ORDER BY AGENCY_CODE";
                        $g=$this->X->sql($sql);
                        $i=0;
                        foreach($g as $h) {
                            $i++;
                            $formData['AGENCY_'.$i]=$h['AGENCY_CODE'];
                        }
                    }
             }

            $output['formData']=$formData;
            return $output;
    }


}

//---
// BEGIN
//---

$A=new MIST();
$data = file_get_contents("php://input");
$data = json_decode($data, TRUE);

if (!isset($data['q'])) $data['q']="user";
$aa=explode("/",$data['q']);
if (isset($aa[1])) {
     $data['q']=$aa[1];
     if (isset($aa[2])) {
         $data['id']=$aa[2];
         }
     if (isset($aa[3])) {
         $data['id2']=$aa[3];
         }
         if (isset($aa[4])) {
         $data['id3']=$aa[4];
         }
}

$output=array();

   switch ($data['q']) {
   	case 'edit-tenant-group':
           $output=$A->getEditTenantGroup($data);
           break;
   	case 'post-edit-tenant-group':
           $output=$A->postEditTenantGroup($data);
           break;
        case 'sql':
           $output=$A->getSQL($data);
           break;    
        default:
            $output=$A->getHomePage($data);
            break;
        }

$o=json_encode($output, JSON_HEX_TAG |
        JSON_HEX_APOS |
        JSON_HEX_QUOT |
        JSON_HEX_AMP |
        JSON_UNESCAPED_UNICODE);

echo $o;

?>
