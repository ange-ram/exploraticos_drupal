<?php

/**
 * @file
 * RandomApiController
 */

namespace Drupal\random_api\Controller;

use Drupal\Core\Controller\ControllerBase;

class RandomApiController extends ControllerBase
{
  public function getRandomApi()
  {
    $gatos = array (
        'fq', '587', 'as3', 'd0j', 'MTg3Mzk5Mw', '247', '5bf', 'b6d', 'e9h' , 'OLJo4g-bI' , '32e' , '9dl', 'ad0',
        'ao1', 'bgb', 'dhl', 'fg7r5tr5f', 'tpu0WqRMo' , '9L733LfMe', 'BL4_E4V2p2' ,  '2g7' , 'a24' , 'ali' , 'ann',
        'brv' , 'crk', 'qzmA6FAUs', 'LHOfWpFZa', 'PA-8TaIpA', 'EA0MVihSk', '5jm', '7hl', 'b5v', 'bce', 'e1t', 'LARay8dya',
        '6Wf5q65oZ', 'SIogQ9qS9', 'UOX__3Q-5', 'pi3sNJdxV'
    );

    $urlApi = 'https://api.thecatapi.com/v1/images/';
  

    $html = '';

    for ($i = 0; $i < 8; $i++) {

        $num = rand(0, 39);
        $apiId=$gatos[$num];
        $apiUrl = $urlApi .$apiId;
  
        $data = file_get_contents($apiUrl);
        $data = json_decode($data, TRUE);
  
        $apiName = ucfirst($data['id']);
        $apiImage = $data['url'];
  
        $html .= "<div class='col-12 col-sm-6 col-md-4 col-lg-3'>
          <img height='400' width='400' class='img-fluid rounded img-thumbnail' alt='$apiName' src='$apiImage' />
        </div>";
      }
    return [
      '#type' => 'markup',
      '#markup' => $this->t('
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="d-flex flex-wrap">
                  ' . $html . '
              </div>
            </div>
          </div>
        </div>
      '),
    ];
    }

    public function getApi($api)
    {
      $urlApi = "https://api.thecatapi.com/v1/breeds/$api";
  
      return [
        '#type' => 'markup',
        '#markup' => $urlApi,
      ];
    }
  }


  

  