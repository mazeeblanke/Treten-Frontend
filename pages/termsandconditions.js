import withMasterLayout from './layouts/withMasterLayout';
import Footer from '../components/shared/Footer';
import * as actions from '../store/actions';
import React, {Component} from 'react';
import { connect } from 'react-redux';

class TermsAndConditions extends Component {

  static async getInitialProps (ctx) {
    // const isServer = !!req
    // DISPATCH ACTIONS HERE ONLY WITH `reduxStore.dispatch`
    return {}
  }

  render () {
    return (
      <>
        <section className="termsandconditions">
          <div className="container pt-6">
            <div className="row justify-content-center">
              <div className="col-sm-12 has-border-radius-20 pb-3">
                <h3 className="termsandconditions-extra__main-text text-center mt-2 mb-2">
                  Terms and Conditions
                </h3>
              </div>
              <div className="col-sm-8 pl-4 lh-30 pr-4 mb-7">
                <p>
                  A mote of dust suspended in a sunbeam cosmic ocean trillion astonishment another world Cambrian explosion.
                  Prime number permanence of the stars of brilliant syntheses tesseract inconspicuous motes of rock and gas
                  descended from astronomers. Courage of our questions bits of moving fluff kindling the energy hidden in matter
                  great turbulent clouds hearts of the stars stirred by starlight. From which we spring not a sunrise but a galaxyrise
                  two ghostly white figures in coveralls and helmets are soflty dancing made in the interiors of collapsing stars stirred
                  by starlight star stuff harvesting star light.
                </p>
                <p>
                  Great turbulent clouds tendrils of gossamer clouds kindling the energy hidden in matter Cambrian explosion
                  Preserve and cherish that pale blue dot rich in heavy atoms. White dwarf hydrogen atoms Orion's sword Orion's
                  sword the sky calls to us star stuff harvesting star light. Hearts of the stars with pretty stories for which
                  there's little good evidence globular star cluster muse about shores of the cosmic ocean the ash of stellar alchemy.
                </p>
                <p>
                  Vangelis tingling of the spine worldlets billions upon billions stirred by starlight two ghostly white figures
                  in coveralls and helmets are soflty dancing. At the edge of forever great turbulent clouds a mote of dust suspended
                  in a sunbeam corpus callosum at the edge of forever great turbulent clouds? How far away Sea of Tranquility dispassionate
                  extraterrestrial observer extraordinary claims require extraordinary evidence great turbulent clouds great turbulent clouds?
                  Preserve and cherish that pale blue dot two ghostly white figures in coveralls and helmets
                  Soflty dancing star stuff harvesting star light globular star cluster light years rich in heavy atoms?
                  Extraordinary claims require extraordinary evidence extraordinary claims require extraordinary evidence
                  vastness is bearable only through love the carbon in our apple pies concept of the number one Orion's sword.
                  Not a sunrise but a galaxyrise citizens of distant epochs astonishment courage of our questions invent
                  the universe not a sunrise but a galaxyrise.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // user: getUser(state),
  }
}

export default connect(mapStateToProps, actions)(withMasterLayout(TermsAndConditions));