<?php

/**
 * @file
 * RandomApiBlock.
 */

namespace Drupal\random_api\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'RandomApiBlock' block.
 *
 * @Block(
 *  id = "random_api_block",
 *  admin_label = @Translation("Random Api block"),
 *  category = @Translation("Random Api"),
 * )
 */

class RandomApiBlock extends BlockBase
{

  /**
   * {@inheritdoc}
   */
  public function build()
  {

    $html = '';

    $gatos = array (
        'fq', '587', 'as3', 'd0j', 'MTg3Mzk5Mw', '247', '5bf', 'b6d', 'e9h' , 'OLJo4g-bI'
    );

    $num = rand(0, 9);
    $apiId=$gatos[$num];
    $urlApi = 'https://api.thecatapi.com/v1/images/';
    $apiUrl = $urlApi .$apiId;

   
    $data = file_get_contents($apiUrl);
    $data = json_decode($data, TRUE);

    $apiName = ucfirst($data['id']);
    $apiImage = $data['url'];

    $html .= "<div class='col-12 col-sm-6 col-md-4 col-lg-3'>
      <img height='400' width='400' class='img-fluid rounded img-thumbnail' alt='$apiName' src='$apiImage' />
     
    </div>";

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
}