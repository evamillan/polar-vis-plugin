/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * Bitergia requires contributions made to this file be 
 * licensed under the Apache-2.0 license or a compatible
 * open source license.
 *
 * Any modifications Copyright Bitergia.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { i18n } from '@osd/i18n';
import { AggGroupNames } from '../../../src/plugins/data/public';
import { Schemas } from '../../../src/plugins/vis_default_editor/public';

import { polarVisRequestHandler } from './data_load/polar_vis_request_handler';
import { polarVisResponseHandler } from './data_load/polar_vis_response_handler';
import { PolarOptions } from './components/polar_vis_options_lazy';
import { VIS_EVENT_TO_TRIGGER } from '../../../src/plugins/visualizations/public';
import './index.scss'
import image from './images/icon-polar.svg';
import { PolarVis } from './components/polar_vis';

// define the visType object, which kibana will use to display and configure new Vis object of this type.
export function getPolarVisTypeDefinition() {
  return {
    type: 'polar',
    name: 'kbn_polar',
    title: i18n.translate('visTypePolar.visTitle', {
      defaultMessage: 'Polar'
    }),
    icon: image,
    description: i18n.translate('visTypePolar.visDescription', {
      defaultMessage: 'Visualize Polar charts'
    }),
    getSupportedTriggers: () => {
      return [VIS_EVENT_TO_TRIGGER.filter];
    },
    visConfig: {
      defaults: {},
      component: PolarVis
    },
    editorConfig: {
      optionsTemplate: PolarOptions,
      schemas: new Schemas([
        {
          group: AggGroupNames.Metrics,
          name: 'metric',
          title: 'Metric',
          aggFilter: ['!geo_centroid', '!geo_bounds'],
          aggSettings: {
            top_hits: {
              allowStrings: false
            }
          },
          max: 1,
          min: 1,
          defaults: [{ type: 'count', schema: 'metric' }]
        },
        {
          group: AggGroupNames.Buckets,
          name: 'field',
          title: "Field",
          min: 1,
          max: 1,
          aggFilter: ['terms', 'filters']
        }
      ])
    },
    implementsRenderComplete: true,
    requestHandler: polarVisRequestHandler,
    responseHandler: polarVisResponseHandler,
    hierarchicalData: (vis) => {
      return true;
    }
  };
}
