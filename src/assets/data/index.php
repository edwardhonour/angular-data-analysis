<?php
//---------------------------------------------------------------------
// Main API Router for this angular directory.
// Author: Â Edward Honour
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

class DA {

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



    function getRNum() {
        return 1000;
    }

    function startNewReport($data) {
         $data['rnum']=$this->getRNum();
         $output=$this->getHomePage($data);
         return $output;
    }

    function selectCriteriaOption($data) {
         $data['id']=$data['data']['WEIGHT_ID'];
         $post=array();
         $post['table_name']="RWH_USER_SELECTION";
         $post['action']="insert";
         $post['RNUM']=$data['rnum'];
         $post['OPTION_ID']=$data['data']['OPTIONID'];

         $sql="select count(*) as C from RWH_USER_SELECTION WHERE RNUM = " . $post['RNUM'] . " AND OPTION_ID = '" . $post['OPTION_ID'] . "'";
         $g=$this->X->sql($sql);
         $c=$g[0]['C'];

         if ($c==0||$post['OPTION_ID']=='1'||$post['OPTION_ID']=='2'||$post['OPTION_ID']=='3'||$post['OPTION_ID']=='4'||$post['OPTION_ID']=='5') {
             $sql="select count(*) as C from RWH_USER_SELECTION WHERE RNUM = " . $post['RNUM'];
             $g=$this->X->sql($sql);
             $c=$g[0]['C'];
             $post['OPTION_ORDER']=$c+1;
             $this->X->post($post);
         }

         $output=$this->getHomePage($data);
         return $output;
  }


    function deleteCriteriaFilter($data) {

    }

    function deleteCriteriaColumn($data) {

    }

    function deleteCriteriaOption($data) {
         $data['id']=$data['data']['WEIGHT_ID'];
         $rnum=$data['data']['RNUM'];
         $sql="delete from RWH_USER_SELECTION WHERE RNUM = " . $rnum . " AND ID = " . $data['data']['CAT_ID'];
         $this->X->execute($sql);
         $sql="select * from RWH_USER_SELECTION WHERE RNUM = " . $rnum . " ORDER BY OPTION_ORDER";
         $templates=$this->X->sql($sql);
         $i=0;
         foreach($templates as $t) {
             $i++;
             $sql="UPDATE RWH_USER_SELECTION SET OPTION_ORDER = " . $i . " WHERE ID = " . $t['ID'];
             $this->X->execute($sql);
         }
         $output=$this->getHomePage($data);
         return $output;
    }

    function getCriteriaCategory($data) {
         $data['id']=$data['data']['CAT_ID'];
         $output=$this->getHomePage($data);
         return $output;
    }

    function getUserSelections($data) {

            $rnum=$data['rnum'];

            $sql="select * from RWH_USER_SELECTION WHERE RNUM = " . $rnum . " ORDER BY OPTION_ORDER";
            $list=$this->X->sql($sql);
            $o=array();

            foreach($list as $t) {
                    $tt=array();
                    $tt['ID']=$t['ID'];
                    $tt['OPTION_ID']=$t['OPTION_ID'];
                    $sql="select OPTION_DSC FROM RWH_DA_OPTIONS WHERE OPTIONID = '" . $tt['OPTION_ID'] . "'";
                    $h=$this->X->sql($sql);
                    $tt['OPTION_DSC']=$h[0]['OPTION_DSC'];
                    array_push($o,$tt);
            }
            return $o;

    }

    function getFilterSelections($data) {

            $rnum=$data['rnum'];
            $sql="select * from RWH_FILTER_SELECTION WHERE RNUM = " . $rnum . " ORDER BY OPTION_ORDER";
            $templates=$this->X->sql($sql);
            return $templates;

    }

    function getColumnSelections($data) {

            $rnum=$data['rnum'];
            $sql="select * from RWH_COLUMN_SELECTION WHERE RNUM = " . $rnum . " ORDER BY COLUMN_ORDER";
            $templates=$this->X->sql($sql);
            return $templates;

    }

    function getCriteriaCategories($data) {

            $sql="select CAT_ID, LONG_NAME, TITLE FROM RWH_CRITERIA_CATEGORIES WHERE SCORING_TYPE = 'PMI' ORDER BY CAT_ID ";
            $templates=$this->X->sql($sql);
            return $templates;

    }

    function getCategoryOptions($id) {
        $sql="SELECT * FROM RWH_DA_OPTIONS WHERE WEIGHT_ID = '" . $id. "' ORDER BY ID";
        $options=$this->X->sql($sql);
        return $options;
    }

    function getSectionTitle($id) {

            $sql="SELECT * FROM RWH_CRITERIA_CATEGORIES WHERE CAT_ID = '" . $id . "' AND SCORING_TYPE = 'PMI'";
            $t=$this->X->sql($sql);
            if (sizeof($t)>0) {
                    $out=$t[0]['LONG_NAME'];
            } else {
                    $out="Please Select a Category";
            }
            return $out;

    }

    function getHomePage($data) {

          $output=array();
          $user=$this->getUser($data);
          if (isset($data['id'])) { $id=$data['id']; } else { $id=0; }
          if (isset($data['rnum'])) {
                  $rnum=$data['rnum'];
          } else {
                  $rnum='';
          }
          if ($rnum=='') {
             $rnum=$this->getRNum();
             $data['rnum']=$rnum;
          }

          if ($user['forced_off']==1) {
             $output=array();
             $output['user']=$user;
             return $output;
          } else {

            $output=array();
            $output['user']=$user;

    
            if ($id!=""&&$id!=0) {
                $output['section_title']=$this->getSectionTitle($id);
                $options=$this->getCategoryOptions($id);
            } else {
                $output['section_title']="Please Select a Category";
                $options=array();
            }

            $output['rnum']=$rnum;
            $output['options']=$options;

            $output['categories']=$this->getCriteriaCategories($data);
            $output['option_selection']=$this->getUserSelections($data);
            $output['filter_selection']=$this->getFilterSelections($data);
            $output['column_selection']=$this->getColumnSelections($data);

            }

          $searchData=array();
          $searchData['SEARCH']="";
          $output['searchData']=$searchData;

          $optionData=array();
          $optionData['WEIGHT_ID']=$id;
          $optionData['CAT_ID']=$id;
          $optionData['RNUM']=$rnum;
          $optionData['USERNAME']=$output['user']['USER_NAME'];
          $optionData['NOT_FLAG']="";
          $optionData['OPTIONID']="";
          $optionData['OPTION_VALUE']="";
          $optionData['OPTION_TYPE']="";
          $output['optionData']=$optionData;

          $filterData=array();
          $filterData['WEIGHT_ID']=$id;
          $filterData['ID']="";
          $filterData['RNUM']=$rnum;
          $filterData['OPTION_ORDER']="";
          $filterData['OPTION_TYPE']="";
          $filterData['OPTION_DESC']="";
          $filterData['OPTION_EXCLUDE']="";
          $filterData['OPTION_ID']="";
          $filterData['CUSTOM1']="";
          $filterData['CUSTOM2']="";
          $output['filterData']=$filterData;

          $columnData=array();
          $columnData['RNUM']=$rnum;
          $columnData['COLUMN_DSC']="";
          $columnData['COLUMN_ID']="";
          $columnData['COLUMN_ORDER']="";
          $columnData['SCORING_TYPE']="";
          $output['columnData']=$columnData;

          $formData=array();
          $formData['CAT_ID']="";
          $output['formData']=$formData;
          return $output;
    }

    function getFilterTitle($id) {

    }


    function getFilterOptions($id) {

    }

    function getFilterCategories($data) {

    }

    function getFilterPage($data) {

          $output=array();
          $user=$this->getUser($data);
          if (isset($data['id'])) { $id=$data['id']; } else { $id=0; }
          if (isset($data['rnum'])) { $rnum=$data['rnum']; } else { $rnum=''; }
          if ($rnum=='') {
             $rnum=$this->getRNum();
             $data['rnum']=$rnum;
          }

          if ($user['forced_off']==1) {
             $output=array();
             $output['user']=$user;
             return $output;
          } else {

            $output=array();
            $output['user']=$user;

            if ($id!=""&&$id!=0) {
                $output['section_title']=$this->getFilterTitle($id);
                $options=$this->getFilterOptions($id);
            } else {
                $output['section_title']="Please Select a Category";
                $options=array();
            }

            $output['rnum']=$rnum;
            $output['options']=$options;

            $output['categories']=$this->getFilterCategories($data);
            $output['option_selection']=$this->getUserSelections($data);
            $output['filter_selection']=$this->getFilterSelections($data);
            $output['column_selection']=$this->getColumnSelections($data);

            }
          $optionData=array();
          $optionData['WEIGHT_ID']=$id;
          $optionData['CAT_ID']=$id;
          $optionData['RNUM']=$rnum;
          $optionData['USERNAME']=$output['user']['USER_NAME'];
          $optionData['NOT_FLAG']="";
          $optionData['OPTIONID']="";
          $optionData['OPTION_VALUE']="";
          $optionData['OPTION_TYPE']="";
          $output['optionData']=$optionData;

          $filterData=array();
          $filterData['WEIGHT_ID']=$id;
          $filterData['ID']="";
          $filterData['RNUM']=$rnum;
          $filterData['OPTION_ORDER']="";
          $filterData['OPTION_TYPE']="";
          $filterData['OPTION_DESC']="";
          $filterData['OPTION_EXCLUDE']="";
          $filterData['OPTION_ID']="";
          $filterData['CUSTOM1']="";
          $filterData['CUSTOM2']="";
          $output['filterData']=$filterData;

          $columnData=array();
          $columnData['RNUM']=$rnum;
          $columnData['COLUMN_DSC']="";
          $columnData['COLUMN_ID']="";
          $columnData['COLUMN_ORDER']="";
          $columnData['SCORING_TYPE']="";
          $output['columnData']=$columnData;

          $formData=array();
          $formData['CAT_ID']="";
          $output['formData']=$formData;
          return $output;
    }

    function getColumnTitle($id) {

    }

    function getColumnOptions($id) {

    }

    function getColumnCategories($id) {

    }

  function getColumnPage($data) {

          $output=array();
          $user=$this->getUser($data);
          if (isset($data['id'])) { $id=$data['id']; } else { $id=0; }
          if (isset($data['rnum'])) { $rnum=$data['rnum']; } else { $rnum=''; }
          if ($rnum=='') {
             $rnum=$this->getRNum();
             $data['rnum']=$rnum;
          }

          if ($user['forced_off']==1) {
             $output=array();
             $output['user']=$user;
             return $output;
          } else {

            $output=array();
            $output['user']=$user;

            if ($id!=""&&$id!=0) {
                $output['section_title']=$this->getColumnTitle($id);
                $options=$this->getColumnOptions($id);
            } else {
                $output['section_title']="Please Select a Category";
                $options=array();
            }

            $output['rnum']=$rnum;
            $output['options']=$options;

            $output['categories']=$this->getColumnCategories($data);
            $output['option_selection']=$this->getUserSelections($data);
            $output['filter_selection']=$this->getFilterSelections($data);
            $output['column_selection']=$this->getColumnSelections($data);

            }

          $optionData=array();
          $optionData['WEIGHT_ID']=$id;
          $optionData['CAT_ID']=$id;
          $optionData['RNUM']=$rnum;
          $optionData['USERNAME']=$output['user']['USER_NAME'];
          $optionData['NOT_FLAG']="";

          $optionData['OPTIONID']="";
          $optionData['OPTION_VALUE']="";
          $optionData['OPTION_TYPE']="";
          $output['optionData']=$optionData;

          $filterData=array();
          $filterData['WEIGHT_ID']=$id;
          $filterData['ID']="";
          $filterData['RNUM']=$rnum;
          $filterData['OPTION_ORDER']="";
          $filterData['OPTION_TYPE']="";
          $filterData['OPTION_DESC']="";
          $filterData['OPTION_EXCLUDE']="";
          $filterData['OPTION_ID']="";
          $filterData['CUSTOM1']="";
          $filterData['CUSTOM2']="";
          $output['filterData']=$filterData;

          $columnData=array();
          $columnData['RNUM']=$rnum;
          $columnData['COLUMN_DSC']="";
          $columnData['COLUMN_ID']="";
          $columnData['COLUMN_ORDER']="";
          $columnData['SCORING_TYPE']="";
          $output['columnData']=$columnData;

          $formData=array();
          $formData['CAT_ID']="";
          $output['formData']=$formData;
          return $output;
    }

    function getSQL($data) {
       $sql=$data['sql'];
       $list=$this->X->sql($sql);
       $output=array();
       $output['list']=$list;
       return $output;
    }

    function selectCriteriaFilter($data) {
       print_r($data);
    }

    function selectCriteriaColumn($data) {
       print_r($data);
    }

    function criteriaSearch($data) {
        $output=$this->getHomePage($data);
        $sql="SELECT * FROM RWH_DA_OPTIONS WHERE UPPER(OPTION_DSC) LIKE '%" . strtoupper($data['data']['SEARCH']) . "%' ORDER BY ID";
        $options=$this->X->sql($sql);
        $output['section_title']="Search Results";
        $output['options']=$options;
        return $output;
    }


}

//---
// BEGIN
//---

$A=new DA();
$data = file_get_contents("php://input");
$data = json_decode($data, TRUE);
$output=array();
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
        case 'get-criteria-category':
             $output=$A->getCriteriaCategory($data);
             break;
        case 'select-criteria-option':
             $output=$A->selectCriteriaOption($data);
             break;
        case 'select-criteria-filter':
             $output=$A->selectCriteriaFilter($data);
             break;
        case 'select-criteria-column':
             $output=$A->selectCriteriaColumn($data);
             break;
        case 'delete-criteria-option':
             $output=$A->deleteCriteriaOption($data);
             break;
        case 'delete-criteria-filter':
             $output=$A->deleteCriteriaFilter($data);
             break;
        case 'delete-criteria-column':
             $output=$A->deleteCriteriaColumn($data);
             break;
        case 'count-results':
             $output=$A->countResults($data);
             break;
        case 'start-new-report':
             $output=$A->startNewReport($data);
             break;
        case 'filter':
             $output=$A->getFilterPage($data);
             break;
        case 'columns':
             $output=$A->getColumnPage($data);
             break;
        case 'perform-criteria-search':
             $output=$A->criteriaSearch($data);
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
