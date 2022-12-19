<?php

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type, Authorization');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS');
header('Content-type: application/json');

require_once('class.LocalDB.php');

$uid=$_COOKIE['uid'];

$X=new OracleDB();
$db=$X->connectACN();

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

        //-- ADD AN OPTION TO THE SELECTION_CRITERIA --//

        $data['id']=$data['data']['WEIGHT_ID'];
        $post=array();
        $post['table_name']="RWH_USER_OPTION_SELECTION";
        $post['action']="insert";

        $post['RNUM']=$data['rnum'];
        $post['OPTION_ID']=$data['data']['OPTIONID'];
        $post['WEIGHT_ID']=$data['data']['WEIGHT_ID'];
        $post['OPTION_TYPE']="OPTION";
        $post['OPTION_SOURCE']="SETS";
        $sql="SELECT OPTION_DSC FROM RWH_DA_OPTIONS WHERE OPTIONID = '" . $post['OPTION_ID'] . "' AND OPTION_TYPE = 'OPTION'";
        $d=$this->X->sql($sql);
        if (sizeof($d)>0) {
            $post['OPTION_DSC']=$d[0]['OPTION_DSC'];
        }

        if ($post['WEIGHT_ID']==1) $post['OPTION_DSC']="(";
        if ($post['WEIGHT_ID']==2) $post['OPTION_DSC']=")";
        if ($post['WEIGHT_ID']==3) $post['OPTION_DSC']="AND";
        if ($post['WEIGHT_ID']==4) $post['OPTION_DSC']="OR";
        if ($post['WEIGHT_ID']==5) $post['OPTION_DSC']="AND NOT";

        $sql="select count(*) as C from RWH_USER_OPTION_SELECTION WHERE ";
        $sql.=" RNUM = " . $post['RNUM'] . " AND OPTION_ID = '" . $post['OPTION_ID'] . "'";
        $g=$this->X->sql($sql);
        $c=$g[0]['C'];

        if ($c==0||
            $post['OPTION_ID']=='1'||
            $post['OPTION_ID']=='2'||
            $post['OPTION_ID']=='3'||$post['OPTION_ID']=='4'||$post['OPTION_ID']=='5') {
            $sql="select count(*) as C from RWH_USER_OPTION_SELECTION WHERE RNUM = " . $post['RNUM'] . " AND OPTION_TYPE = 'OPTION'";
            $g=$this->X->sql($sql);
            $c=$g[0]['C'];
            $post['OPTION_ORDER']=$c+1;
            $this->X->post($post);
        }

        $output=$this->getHomePage($data);
        return $output;

      }

      function deleteCriteriaColumn($data) {
         $sql="delete from RWH_USER_COLUMN_SELECTION WHERE ID = " . $data['data']['CAT_ID'];
         $this->X->execute($sql);
        //-- REorder...
        $sql="select * from RWH_USER_COLUMN_SELECTION WHERE RNUM = " . $data['data']['RNUM'] . " ORDER BY COLUMN_ORDER";
        $templates=$this->X->sql($sql);
        $i=0;
        foreach($templates as $t) {
            $i++;
            $sql="UPDATE RWH_USER_COLUMN_SELECTION SET COLUMN_ORDER = " . $i . " WHERE ID = " . $t['ID'];
            $this->X->execute($sql);
        }
        $output=$this->getHomePage($data);
        return $output;
   }
/* */
   function deleteCriteriaOption($data) {
        $data['id']=$data['data']['WEIGHT_ID'];
        $rnum=$data['data']['RNUM'];
        $sql="delete from RWH_USER_OPTION_SELECTION WHERE ID = " . $data['data']['ID'];
        $this->X->execute($sql);
        //-- REorder...
        $sql="select * from RWH_USER_OPTION_SELECTION WHERE RNUM = " . $rnum . " AND OPTION_TYPE = 'OPTION' ORDER BY OPTION_ORDER";
        $templates=$this->X->sql($sql);
        $i=0;
        foreach($templates as $t) {
            $i++;
            $sql="UPDATE RWH_USER_OPTION_SELECTION SET OPTION_ORDER = " . $i . " WHERE ID = " . $t['ID'];
            $this->X->execute($sql);
        }
        $output=$this->getHomePage($data);
        return $output;
   }

  function deleteCriteriaFilter($data) {
        $data['id']=$data['data']['WEIGHT_ID'];
        $rnum=$data['data']['RNUM'];
        $sql="delete from RWH_USER_OPTION_SELECTION WHERE ID = " . $data['data']['ID'];
        $this->X->execute($sql);
        //-- REorder...
        $sql="select * from RWH_USER_OPTION_SELECTION WHERE RNUM = " . $rnum . " AND OPTION_TYPE <> 'OPTION' ORDER BY OPTION_ORDER";
        $templates=$this->X->sql($sql);
        $i=0;
        foreach($templates as $t) {
            $i++;
            $sql="UPDATE RWH_USER_OPTION_SELECTION SET OPTION_ORDER = " . $i . " WHERE ID = " . $t['ID'];
            $this->X->execute($sql);
        }
        $output=$this->getHomePage($data);
        return $output;
  }

  function getCategoryOptions($id) {
       $sql="SELECT * FROM RWH_DA_OPTIONS WHERE WEIGHT_ID = '" . $id. "' AND OPTION_TYPE = 'OPTION' ORDER BY OPTION_ORDER";
       $options=$this->X->sql($sql);
       return $options;
       }

   function getCriteriaCategory($data) {
        $data['id']=$data['data']['CAT_ID'];
        $output=$this->getHomePage($data);
        return $output;
   }

   function getFeatureCriteriaCategory($data) {
        $data['id']=$data['data']['CAT_ID'];
           $d=array();
           $d['q']="columns";
           $d['uid']=$data['uid'];
           $d['rnum']=$data['rnum'];

        $output=$this->getColumnPage($d);
        $output['options2']=$this->getCategoryOptions($data['id']);
        return $output;
   }

   function getUserSelections($data) {

           $rnum=$data['rnum'];

           $sql="select * from RWH_USER_OPTION_SELECTION WHERE RNUM = " . $rnum . " AND OPTION_TYPE = 'OPTION' ORDER BY OPTION_ORDER";
           $list=$this->X->sql($sql);

        }

        function getFilterSelections($data) {
             $rnum=$data['rnum'];
             $sql="select * from RWH_USER_OPTION_SELECTION WHERE RNUM = " . $rnum . " AND OPTION_TYPE <> 'OPTION' ORDER BY OPTION_ORDER";
             $templates=$this->X->sql($sql);
             return $templates;
     }
 
     function getColumnSelections($data) {
             $rnum=$data['rnum'];
             $sql="select * from RWH_USER_COLUMN_SELECTION WHERE RNUM = " . $rnum . " ORDER BY COLUMN_ORDER";
             $templates=$this->X->sql($sql);
             return $templates;
     }
 
     function getCriteriaCategories($data) {
             $sql="select CAT_ID, LONG_NAME, TITLE FROM RWH_CRITERIA_CATEGORIES WHERE SCORING_TYPE = 'PMI' ORDER BY CAT_ID ";
             $templates=$this->X->sql($sql);
             return $templates;
     }
 
     function getFilterCategories($data) {
             $sql="select CAT_ID, LONG_NAME, TITLE FROM RWH_CRITERIA_CATEGORIES WHERE SCORING_TYPE = 'FLT' ORDER BY CAT_ID ";
             $templates=$this->X->sql($sql);
             return $templates;
     }
 
     function getFilterOptions($data) {
         $output=$this->getHomePage($data);
         $sql="SELECT * FROM RWH_DA_OPTIONS WHERE OPTION_TYPE = '" . $data['data']['WEIGHT_ID'] . "' ORDER BY OPTION_ORDER";
         $options=$this->X->sql($sql);
         $output['options']=$options;
         $output['section_title']=$this->getSectionTitle($data['data']['WEIGHT_ID']);
         return $output;
     }
 
     function getColumnOptions($data) {
         $output=$this->getHomePage($data);
         $sql="SELECT * FROM RWH_DA_OPTIONS WHERE OPTION_TYPE = '" . $data['data']['WEIGHT_ID'] . "' ORDER BY OPTION_ORDER";
         $options=$this->X->sql($sql);
         if (sizeof($options)==0) {
         $sql="SELECT * FROM RWH_DA_OPTIONS WHERE WEIGHT_ID = '" . $data['data']['WEIGHT_ID'] . "' AND OPTION_TYPE = 'OPTION' ORDER BY OPTION_ORDER";
         $options=$this->X->sql($sql);
        }
        $output['options']=$options;
        return $output;
    }

    function startSection($title,$id) {
            $section=array();
            $section['title']=$title;
            $section['id']=$id;
            $section['items']=array();
            return $section;
    }

    function pushSectionItem($section, $title, $value) {
        $item=array();
        $item['title']=$title;
        $item['button']=$value;
        array_push($section['items'],$item);
        return $section;
    }

    function getFilterAccordion() {
        $output=array();
        $output['title']="Filter Categories";
        $sections=array();
        $section=$this->startSection("Location","GOne");
        $section=$this->pushSectionItem($section,"Regions","REGION");
        $section=$this->pushSectionItem($section,"States","STATE");
        $section=$this->pushSectionItem($section,"Cities","CITY");
        $section=$this->pushSectionItem($section,"Zip Codes","ZIPCODE");
        $section=$this->pushSectionItem($section,"Districts / Areas","DISTRICT");
        array_push($sections,$section);

        $section=$this->startSection("Building","GTwo");
        $section=$this->pushSectionItem($section,"Building Types","BUILDINGTYPE");
        $section=$this->pushSectionItem($section,"Ownership","OWNERSHIP");
        $section=$this->pushSectionItem($section,"Facility Type","FACILITYTYPE");
        array_push($sections,$section);


        $section=$this->startSection("Other","GThree");
        $section=$this->pushSectionItem($section,"FSL","FSL");
        $section=$this->pushSectionItem($section,"Inspector","INSPECTOR");
        $section=$this->pushSectionItem($section,"Area Commander","AC");
        $section=$this->pushSectionItem($section,"District Commander","DC");
        $section=$this->pushSectionItem($section,"Tenants","TENANT");
        $section=$this->pushSectionItem($section,"Delegation Agency","TENANT");
        $section=$this->pushSectionItem($section,"Delegation Type","TENANT");
        $section=$this->pushSectionItem($section,"FSA Schedule","FSAYEAR");
        array_push($sections,$section);
        $output['sections']=$sections;
        return $output;
    }

    function getColumnAccordion() {
        $output=array();
        $output['title']="Building Data";
        $sections=array();
        $section=$this->startSection("Facility Fields","FOne");
        $section=$this->pushSectionItem($section,"Facility Background","FACILITY");
        $section=$this->pushSectionItem($section,"Assessment Data","FSA");
        $section=$this->pushSectionItem($section,"Asset Data","BSA");
        $section=$this->pushSectionItem($section,"Functionality Tests","FACILITY");
        array_push($sections,$section);

        $section=$this->startSection("Facility Overview","GTwo");
        $section=$this->pushSectionItem($section,"General Facility Description","32100");
        $section=$this->pushSectionItem($section, "Access to Non-Public Areas","32200");
        $section=$this->pushSectionItem($section, "Identification as a Federal Facility","32300");
        $section=$this->pushSectionItem($section, "Facility Operating Hours","32310");
        $section=$this->pushSectionItem($section, "Adjacent to a Navigable Waterway","32320");
        $section=$this->pushSectionItem($section, "Significatant Areas and Assets","32000");
        array_push($sections,$section);

        $section=$this->startSection("Physical Security","GThree");
        $section=$this->pushSectionItem($section, "Fences","32100");
        $section=$this->pushSectionItem($section, "Gates","32200");
        $section=$this->pushSectionItem($section, "VSS","32300");
        $section=$this->pushSectionItem($section, "IDS","32310");
        $section=$this->pushSectionItem($section, "Parking","32320");
        $section=$this->pushSectionItem($section, "Entry Control","32000");
        $section=$this->pushSectionItem($section, "Illumination","7500");
        $section=$this->pushSectionItem($section, "Barriers","6300");
        $section=$this->pushSectionItem($section, "Building Envelope","5400");
        array_push($sections,$section);

        $section=$this->startSection("Secuirty Management","GFour");
        $section=$this->pushSectionItem($section, "Continuity of Operations","2001");
        $section=$this->pushSectionItem($section, "Security Plan","2062");
        $section=$this->pushSectionItem($section, "Threat Levels","2075");
        $section=$this->pushSectionItem($section, "Security Communications","2105");
        $section=$this->pushSectionItem($section, "Occupant Emergency Plan","2121");
        $section=$this->pushSectionItem($section, "Security and Emergency Notification","2122");
        $section=$this->pushSectionItem($section, "Duress Procedures","2123");
        $section=$this->pushSectionItem($section, "Suspicious Package Procedures","2115");
        $section=$this->pushSectionItem($section, "FSC or DO","2116");
        $section=$this->pushSectionItem($section, "Background Checks","2180");
        array_push($sections,$section);

        $section=$this->startSection("Security Force","GFive");
        $section=$this->pushSectionItem($section, "Staffing","1001");
        $section=$this->pushSectionItem($section, "Command and Control","1117");
        $section=$this->pushSectionItem($section, "Equipment","1051");
        $section=$this->pushSectionItem($section, "Post Guidelines","1116");
        $section=$this->pushSectionItem($section, "Training","1068");
        array_push($sections,$section);

        $section=$this->startSection("Facility Security Background","GSix");
        $section=$this->pushSectionItem($section, "Additional Countermeasures","4001");
        array_push($sections,$section);

        $section=$this->startSection("TAR Sources/Databases","GSeven");
        $section=$this->pushSectionItem($section, "Open Source","12000");
        $section=$this->pushSectionItem($section, "Databases","12010");
        $section=$this->pushSectionItem($section, "Tenant Holdings","12020");
        $section=$this->pushSectionItem($section, "Likely Threats","12030");
        array_push($sections,$section);

        $section=$this->startSection("Utility Dependencies","GEight");
        $section=$this->pushSectionItem($section, "Electric Dependency","7600");
        $section=$this->pushSectionItem($section, "Natural Gas Dependency","7700");
        $section=$this->pushSectionItem($section, "Water Dependency","7800");
        $section=$this->pushSectionItem($section, "Waste Water Dependency","7900");
        array_push($sections,$section);

        $section=$this->startSection("Building Threat", "GNine");
        $section=$this->pushSectionItem($section, "Likely Threat","19000");
        $section=$this->pushSectionItem($section, "Surrounding Area","19100");
        $section=$this->pushSectionItem($section, "High Profile","19200");
        $section=$this->pushSectionItem($section, "Building Characteristics","19300");
        $section=$this->pushSectionItem($section, "Visual Controls","19400");
        $section=$this->pushSectionItem($section, "Policy","19500");
        array_push($sections,$section);

        $section=$this->startSection("Tier 2 Cyber","GTen");
        $section=$this->pushSectionItem($section, "Cybersecurity Management","9900");
        $section=$this->pushSectionItem($section, "Cybersecurity Forces","9900");
        $section=$this->pushSectionItem($section, "Cybersecurity Controls","9900");
        $section=$this->pushSectionItem($section, "Incident Response","9900");
        $section=$this->pushSectionItem($section, "Dependencies","9900");

        array_push($sections,$section);
        $output['sections']=$sections;
        return $output;
    }

    function getHomeAccordion() {
        $output=array();
        $output['title']="Option Categories";
        $sections=array();
        $section=$this->startSection("Facility Selection","One");
        $section=$this->pushSectionItem($section,"Building Types","9990");
        array_push($sections,$section);

        $section=$this->startSection("Facility Overview","Two");
        $section=$this->pushSectionItem($section,"General Facility Description","32100");
        $section=$this->pushSectionItem($section, "Access to Non-Public Areas","32200");
        $section=$this->pushSectionItem($section, "Identification as a Federal Facility","32300");
        $section=$this->pushSectionItem($section, "Facility Operating Hours","32310");
        $section=$this->pushSectionItem($section, "Adjacent to a Navigable Waterway","32320");
        $section=$this->pushSectionItem($section, "Significatant Areas and Assets","32000");
        array_push($sections,$section);

        $section=$this->startSection("Physical Security","Three");
        $section=$this->pushSectionItem($section, "Fences","32100");
        $section=$this->pushSectionItem($section, "Gates","32200");
        $section=$this->pushSectionItem($section, "VSS","32300");
        $section=$this->pushSectionItem($section, "IDS","32310");
        $section=$this->pushSectionItem($section, "Parking","32320");
        $section=$this->pushSectionItem($section, "Entry Control","32000");
        $section=$this->pushSectionItem($section, "Illumination","7500");
        $section=$this->pushSectionItem($section, "Barriers","6300");
        $section=$this->pushSectionItem($section, "Building Envelope","5400");
        array_push($sections,$section);

        $section=$this->startSection("Secuirty Management","Four");
        $section=$this->pushSectionItem($section, "Continuity of Operations","2001");
        $section=$this->pushSectionItem($section, "Security Plan","2062");
        $section=$this->pushSectionItem($section, "Threat Levels","2075");
        $section=$this->pushSectionItem($section, "Security Communications","2105");
        $section=$this->pushSectionItem($section, "Occupant Emergency Plan","2121");
        $section=$this->pushSectionItem($section, "Security and Emergency Notification","2122");
        $section=$this->pushSectionItem($section, "Duress Procedures","2123");
        $section=$this->pushSectionItem($section, "Suspicious Package Procedures","2115");
        $section=$this->pushSectionItem($section, "FSC or DO","2116");
        $section=$this->pushSectionItem($section, "Background Checks","2180");
        array_push($sections,$section);

        $section=$this->startSection("Security Force","Five");
        $section=$this->pushSectionItem($section, "Staffing","1001");
        $section=$this->pushSectionItem($section, "Command and Control","1117");
        $section=$this->pushSectionItem($section, "Equipment","1051");
        $section=$this->pushSectionItem($section, "Post Guidelines","1116");
        $section=$this->pushSectionItem($section, "Training","1068");
        array_push($sections,$section);

        $section=$this->startSection("Facility Security Background","Six");
        $section=$this->pushSectionItem($section, "Additional Countermeasures","4001");
        array_push($sections,$section);

        $section=$this->startSection("TAR Sources/Databases","Seven");
        $section=$this->pushSectionItem($section, "Open Source","12000");
        $section=$this->pushSectionItem($section, "Databases","12010");
        $section=$this->pushSectionItem($section, "Tenant Holdings","12020");
        $section=$this->pushSectionItem($section, "Likely Threats","12030");
        array_push($sections,$section);

        $section=$this->startSection("Utility Dependencies","Sev");
        $section=$this->pushSectionItem($section, "Electric Dependency","7600");
        $section=$this->pushSectionItem($section, "Natural Gas Dependency","7700");
        $section=$this->pushSectionItem($section, "Water Dependency","7800");
        $section=$this->pushSectionItem($section, "Waste Water Dependency","7900");
        array_push($sections,$section);

        $section=$this->startSection("Building Threat", "Eight");
        $section=$this->pushSectionItem($section, "Likely Threat","19000");
        $section=$this->pushSectionItem($section, "Surrounding Area","19100");
        $section=$this->pushSectionItem($section, "High Profile","19200");
        $section=$this->pushSectionItem($section, "Building Characteristics","19300");
        $section=$this->pushSectionItem($section, "Visual Controls","19400");
        $section=$this->pushSectionItem($section, "Policy","19500");
        array_push($sections,$section);

        $section=$this->startSection("Tier 2 Cyber","Nine");
        $section=$this->pushSectionItem($section, "Cybersecurity Management","9900");
        $section=$this->pushSectionItem($section, "Cybersecurity Forces","9900");
        $section=$this->pushSectionItem($section, "Cybersecurity Controls","9900");
        $section=$this->pushSectionItem($section, "Incident Response","9900");
        $section=$this->pushSectionItem($section, "Dependencies","9900");

        array_push($sections,$section);
        $output['sections']=$sections;
        return $output;

    }

    function getSectionTitle($id) {
            $sql="SELECT * FROM RWH_CRITERIA_CATEGORIES WHERE CAT_ID = '" . $id . "' AND SCORING_TYPE = 'PMI'";
            $t=$this->X->sql($sql);
            if (sizeof($t)>0) {
                    $out=$t[0]['LONG_NAME'];
            } else {
                    $out="Please Select a Category";
            }
            if ($id=='REGION') $out="Include or Exclude Regions";
            if ($id=='STATE') $out="Include or Exclude States";
            if ($id=='CITY') $out="Include or Exclude Cities";
            if ($id=='ZIPCODE') $out="Include or Exclude Zip Codes";
            if ($id=='DISTRICT') $out="Include or Exclude Districts";
            if ($id=='FSL') $out="Include or Exclude FSLs";
            return $out;
    }

    function getFilterTitle($id) {
            $sql="SELECT * FROM RWH_CRITERIA_CATEGORIES WHERE CAT_ID = '" . $id . "' AND SCORING_TYPE = 'FLT'";
            $t=$this->X->sql($sql);
            if (sizeof($t)>0) {
                    $out=$t[0]['LONG_NAME'];
            } else {
                    $out="Please Select a Category";
            }
            return $out;
    }


function makeOptionData($id,$rnum,$username) {
          $optionData=array();
          $optionData['WEIGHT_ID']=$id;
          $optionData['CAT_ID']=$id;
          $optionData['RNUM']=$rnum;
          $optionData['USERNAME']=$username;
          $optionData['NOT_FLAG']="";
          $optionData['OPTIONID']="";
          $optionData['OPTION_VALUE']="";
          $optionData['OPTION_TYPE']="";
          $optionData['OPTION_SOURCE']="";
          $optionData['OPTION_EXCLUDE']="";
          return $optionData;
}

function makeFilterData($id,$rnum) {
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
          return $filterData;
}

function makeColumnData($id,$rnum) {
          $columnData=array();
          $columnData['RNUM']=$rnum;
          $columnData['COLUMN_DSC']="";
          $columnData['COLUMN_ID']="";
          $columnData['COLUMN_ORDER']="";
          $columnData['SCORING_TYPE']="";
          return $columnData;
}

function makeSearchData($id,$rnum) {
          $searchData=array();
          $searchData['SEARCH']="";
          return $searchData;
}

function makeFormData($id,$rnum) {
          $formData=array();
          $formData['ID']="";
          $formData['CAT_ID']="";
          return $formData;
}

   function getHomePage($data) {

          $output=array();

          $user=$this->getUser($data);
          if (isset($data['id'])) { $id=$data['id']; } else { $id=0; }
          if (isset($data['rnum'])) $rnum=$data['rnum']; else $rnum='';

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
                $output['home_accordion']=$this->getHomeAccordion();
                $output['filter_accordion']=$this->getFilterAccordion();
                $output['column_accordion']=$this->getColumnAccordion();
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
            $output['searchData']=$this->makeSearchData($id,$rnum);
            $output['optionData']=$this->makeOptionData($id,$rnum,$output['user']['USER_NAME']);
            $output['filterData']=$this->makeFilterData($id,$rnum);
            $output['columnData']=$this->makeColumnData($id,$rnum);
            $output['formData']=$this->makeFormData($id,$rnum);
            $output['postForm']=$this->makeFormData($id,$rnum);
            return $output;
      }
  
  /* */
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
            $output['options2']=array();
  
            $output['optionData']=$this->makeOptionData($id,$rnum,$output['user']['USER_NAME']);
            $output['filterData']=$this->makeFilterData($id,$rnum);
            $output['columnData']=$this->makeColumnData($id,$rnum);
            $output['formData']=$this->makeFormData($id,$rnum);
            $output['postForm']=$this->makeFormData($id,$rnum);
            return $output;
      }
  
      function getColumnTitle($id) {
  
      }
  
      function getColumnCategories($id) {
  
      }
  
  function makeFrom($data) {
  
      $rnum=$data['rnum'];
  
      $sql=" FROM ";
      $sql.=" RWH_DIM_FACILITY F WHERE F.ACTIVE_FLAG = 'Y' AND F.FPS_RESPONSIBLE = 'Y' ";
      $sql.=" AND BUILDING_NBR NOT IN (SELECT BUILDING_NBR FROM FPS_EXCLUDED_BUILDINGS) ";
  
      $s="SELECT OPTION_ID FROM RWH_USER_OPTION_SELECTION WHERE RNUM = ". $rnum . " AND OPTION_SOURCE = 'SETS' ";
      $s.=" ORDER BY OPTION_ORDER ";
      $t=$this->X->sql($s);
      if (sizeof($t)>0) {
          $a="";
          $c=0;
          $oper="";
          foreach($t as $u) {
          if ($u['OPTION_ID']=='1'||$u['OPTION_ID']=='3'||$u['OPTION_ID']=='4'||$u['OPTION_ID']=='5') {
             if ($u['OPTION_ID']=='1') $oper.=" ( ";
             if ($u['OPTION_ID']=='2') $oper.=" ) ";
             if ($u['OPTION_ID']=='3') $oper.=" INTERSECT ";
             if ($u['OPTION_ID']=='4') $oper.=" UNION ";
             if ($u['OPTION_ID']=='5') $oper.=" MINUS ";//
             $a.= $oper;
         } else {
             $a.= $oper . " (SELECT FACILITY_ID FROM RWH_FACILITY_OPTIONS WHERE OPTION_ID = " . $u['OPTION_ID'] . ")";
             $oper=" INTERSECT ";
            }
            $c++;
            }
            $sql .= " AND F.FACILITY_ID IN (" . $a . ")";
         }
     
         return $sql;
     
     }
     
     function doCount($data) {
     
         $rnum=$data['rnum'];
     
         //$sql="SELECT to_char(count(DISTINCT F.BUILDING_NBR),'99,999') as C ";
         $sql="SELECT count(DISTINCT F.BUILDING_NBR) as C ";
         $sql.=$this->makeFrom($data);
     
        // echo $sql;
         //    $ora=new OracleDB();
     //    $db=$ora->connectACN();
     //    $data = $db->query($sql);
     //    $result = $data->fetchAll(PDO::FETCH_ASSOC);
     //    $result=$this->X->sql($sql);
     
     //    if ($result) {
     //             $C=$result[0]['C'];
     //             $C=str_replace(" ","",$C);
     //             $C=$C . " matches";
     //          } else{
     //             $C="Expression Error";
         //    }
         $C="Testing";
         $output=array();
         $output['count']=$C;
         return $output;
     }
     
     function doReport($data) {
     
     
         $rnum=$data['rnum'];
     
         $output=$this->getHomePage($data);
         $sql="SELECT FACILITY_ID, BUILDING_NBR, FACILITY_NAME, REGION_ID, DISTRICT_ID, CITY_NAME, STATE_ABBR, ";
         $sql.=" DECODE(OWNERSHIP_ID,200004,'Owned',200029,'Leased',300029,'N','') AS OWNERSHIP_ID, FSL ";
         $sql.=$this->makeFrom($data);
     
         $h=$this->X->sql($sql);
         $output['list']=$h;
         return $output;
     
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
                $output['options2']=array();
                $output['optionData']=$this->makeOptionData($id,$rnum,$output['user']['USER_NAME']);
                $output['filterData']=$this->makeFilterData($id,$rnum);
                $output['columnData']=$this->makeColumnData($id,$rnum);
                $output['formData']=$this->makeFormData($id,$rnum);
                $output['postForm']=$this->makeFormData($id,$rnum);
                return $output;
       }
      
          function getSQL($data) {
             $sql=$data['sql'];
             $list=$this->X->sql($sql);
             $output=array();
             $output['list']=$list;
             return $output;
          }
      
          function getOptionsList($data) {
             $output=$this->getHomePage($data);
             $sql="SELECT * FROM RWH_DA_OPTIONS ORDER BY WEIGHT_ID, OPTION_ORDER";
             $list=$this->X->sql($sql);
             $output['list']=$list;
             $formData=array();
             $formData['ID']="";
             $formData['WEIGHT_ID']="";
             $formData['TITLE']="";
             $formData['SHORT_NAME']="";
             $formData['OPTIONID']="";
             $formData['OPTION_DSC']="";
             $formData['OPTION_TYPE']="";
             $formData['OPTION_SOURCE']="";
             $formData['OPTION_ORDER']="";
             $formData['DISPLAY_LEVEL']="";
             $output['formData']=$formData;
             return $output;
          }
      
          function selectCriteriaFilter($data) {
             print_r($data);
          }
      
          function selectCriteriaColumn($data) {
      
               $data=$data['data'];
               $post=array();
               $post['table_name']="RWH_USER_COLUMN_SELECTION";
               $post['action']="insert";
               $post['RNUM']=$data['RNUM'];
               $post['COLUMN_DSC']=$data['OPTION_VALUE'];
               $post['COLUMN_ID']=$data['OPTION_SOURCE'];
               $post['SCORING_TYPE']=$data['OPTION_TYPE'];
      
               $sql="select count(*) as C from RWH_USER_COLUMN_SELECTION WHERE ";
               $sql.=" RNUM = " . $post['RNUM'] . " AND COLUMN_ID = '" . $data['OPTION_SOURCE'] . "'";
      
               $g=$this->X->sql($sql);
               $c=$g[0]['C'];
      
               if ($c==0) {
                       $sql="select count(*) as C from RWH_USER_COLUMN_SELECTION WHERE ";
                       $sql.="  RNUM = " . $post['RNUM'];
                       $g=$this->X->sql($sql);
                       $c=$g[0]['C'];
                       $post['COLUMN_ORDER']=$c+1;
                   $this->X->post($post);
               }
      
               $output=$this->getColumnPage($data);
               return $output;
      
          }
      
          function selectCriteriaFeatureColumn($data) {
      
                  $rnum=$data['rnum'];
               $data=$data['data'];
               $post=array();
      
               $sql="select * from RWH_DA_OPTIONS WHERE OPTIONID = '" . $data['OPTIONID'] . "'";
               $t=$this->X->sql($sql);
      
               $post['table_name']="RWH_USER_COLUMN_SELECTION";
               $post['action']="insert";
               $post['RNUM']=$rnum;
               $post['COLUMN_DSC']=$t[0]['OPTION_DSC'];
               $post['COLUMN_ID']=$data['OPTIONID'];
               $post['SCORING_TYPE']="FEATURE";
      
               $sql="select count(*) as C from RWH_USER_COLUMN_SELECTION WHERE ";
               $sql.=" RNUM = " . $post['RNUM'] . " AND COLUMN_ID = '" . $data['OPTIONID'] . "'";

               $g=$this->X->sql($sql);
               $c=$g[0]['C'];
      
               if ($c==0) {
                       $sql="select count(*) as C from RWH_USER_COLUMN_SELECTION WHERE ";
                       $sql.="  RNUM = " . $post['RNUM'];
                       $g=$this->X->sql($sql);
                       $c=$g[0]['C'];
                       $post['COLUMN_ORDER']=$c+1;
                   $this->X->post($post);
               }
      
               $output=$this->getColumnPage($data);
               return $output;
      
          }
      
          function criteriaSearch($data) {
              $output=$this->getHomePage($data);
              $sql="SELECT * FROM RWH_DA_OPTIONS WHERE UPPER(OPTION_DSC) LIKE '%" . strtoupper($data['data']['SEARCH']) . "%' ORDER BY OPTION_ORDER";
              $options=$this->X->sql($sql);
              $output['section_title']="Search Results";
              $output['options']=$options;
              return $output;
          }
      
          function postEditDAOption($data) {
                $post=$data['data'];
                $this->X->post($post);
                $output=array();
                $output['error_code']=0;
                return $output;
          }
      
          function includeFilterOptions($data) {
               $post=array();
               $post['action']="insert";
               $post['table_name']="RWH_USER_OPTION_SELECTION";
               $post['RNUM']=$data['data']['RNUM'];
               $post['WEIGHT_ID']=$data['data']['WEIGHT_ID'];
               $post['OPTION_ID']=$data['data']['OPTIONID'];
               $post['OPTION_ORDER']=0;
               $post['OPTION_TYPE']=$data['data']['OPTION_TYPE'];
               $post['OPTION_DSC']=$data['data']['OPTION_VALUE'];
               $post['OPTION_EXCLUDE']=$data['data']['OPTION_EXCLUDE'];
               $post['OPTION_SOURCE']=$data['data']['OPTION_SOURCE'];
               $this->X->post($post);
               $output=$this->getFilterPage($data);
                return $output;
          }
      
          function excludeFilterOptions($data) {
      
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
      if (!isset($data['id'])) $data['id']="";
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
                   case 'get-feature-criteria-category':
                        $output=$A->getFeatureCriteriaCategory($data);
                        break;
                   case 'get-filter-option':
                        $output=$A->getFilterOptions($data);
                        break;
                   case 'get-column-option':
                        $output=$A->getColumnOptions($data);
                        break;
                   case 'do-count':
                        $output=$A->doCount($data);
                        break;
                   case 'select-criteria-option':
                        $output=$A->selectCriteriaOption($data);
                        break;
                   case 'select-filter-option':
                        $output=$A->selectCriteriaFilter($data);
                        break;
                   case 'select-criteria-column':
                        $output=$A->selectCriteriaColumn($data);
                        break;
                   case 'select-criteria-feature-option':
                        $output=$A->selectCriteriaFeatureColumn($data);
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
               case 'report':
                    $output=$A->doReport($data);
                    break;
               case 'perform-criteria-search':
                    $output=$A->criteriaSearch($data);
                    break;
               case 'include-filter-option':
               case 'exclude-filter-option':
                    $output=$A->includeFilterOptions($data);
                    break;
       //      case: 'include-filter-option':
       //           $output=$A->includeFilterOptions($data);
       //           break;
       //      case: 'exclude-filter-option':
       //           $output=$A->excludeFilterOptions($data);
       //           break;
               case 'post-edit-da-option':
                    $output=$A->postEditDAOption($data);
                    break;
               case 'options':
                    $output=$A->getOptionsList($data);
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
                                                                                                                                              1056,1        Bot