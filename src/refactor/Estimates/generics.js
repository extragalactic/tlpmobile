import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

const generics = [
  {
    prop: 'watertest',
    des: 'Waterproof Test',
    text: () => (
      <View
        style={{
          padding: 10,
        }}
      >
        <Text h2> Waterproof Test</Text>
        <Text> {'\n'}A water test is the one and only way to truly troubleshoot where water is coming from. {'\n'}</Text>
        <Text>You will need 2 people to conduct this water test - one on the inside and the other on
                the outside with the hose. Firstly, let's follow the law of gravity. We know water runs
              downhill so it makes no sense to put water any place on the elevation other than the
              very bottom (which is on the grass or concrete pavement etc. at the foundation). Just
              let the water sit and flow from the hose. With one person on the inside monitoring and
              after no more than 15 minutes of steady flow from a garden hose, if there is no
              moisture coming in then we know your below-grade foundation is good. The next
              junction is where the concrete meets the brick work or veneer. If there is not adequate
              flashing and weepers than that can also cause your water problem. But the water test
              and hose will tell you that after no more than 15 minutes with somebody monitoring on
              the inside. If there is still no evidence of water, keep raising the water (no more than 2
              feet in height at a time) whether it be glass doors / windowsills / brickwork etc. Keep
              on going as one time we found that the water showing up on the basement floor
              actually originated from voids in mortar joints that were on the second floor a long way
              from the basement floor.</Text>
      </View>
    ),
  },
  {
    prop: 'sills',
    des: 'Stone WindowSills',
    text: () => (
      <View
        style={{
          padding: 10,
        }}
      >
        <Text h2>Stone Window Sills </Text>
        <Text>{'\n'}{'\u2022'} New limestone sills to be 3" or 4" depending on size of rough opening</Text>
        <Text>{'\u2022'} Sills come with rock face and custom cut drip edges (on-site) to reflect water away
from masonry below</Text>
        <Text>{'\u2022'}Approximate 2 inch overhang with drip edge cut thoroughly through stone and
mortar joints from end to end 1/4"deep (drip edge) and 1-1.5" away from the wall
(drip edge)</Text>
        <Text>{'\u2022'} Sills are full length stones up to 6' in length (less mortar joints)</Text>
        <Text>{'\u2022'} Caulking at base where new sills meets window</Text>
        <Text>10 year warranty on workmanship and materials</Text>
      </View>
    ),
  },
  {
    prop: 'pargeex',
    des: 'Repair, Grind & Parge',
    text: () => (
      <View
        style={{
          padding: 10,
        }}
      >
        <Text h2>Repair, Grind & Parge </Text>
        <Text>{'\n'}{'\u2022'} We lightly grind every single square inch of concrete until the surface is completely
clean. Missing a single square inch can and will cause the parge to breakdown</Text>
        <Text>{'\u2022'}We repair all cracks and voids in foundation. Our parge includes 2-3” below grade
and where there is interlock, we lift interlock, cut interlock if necessary and reset.</Text>
        <Text>{'\u2022'} We apply trowel on parge by pressing into place as evenly as possible. After initial
setting finish, we parge with a float sandstone finish.</Text>
      </View>
    ),
  },

  {
    prop: 'obc',
    des: 'Ontario Building Code (OBC)—— Sidewalk/ garage pad /slab',
    text: () => (
      <View
        style={{
          padding: 10,
        }}
      >
        <Text h2>Ontario Building Code (OBC) — Sidewalk / Garage Pad / Slab</Text>
        <Text>{'\n'}{'\u2022'}Install 2" HPB aggregates</Text>
        <Text>{'\u2022'} Install 6"x6" wire mesh to centre of new concrete</Text>
        <Text>{'\u2022'} Pour/place 32 MPA ready-mix concrete, 4" thick</Text>
        <Text>{'\u2022'} Float or broom finish </Text>
        <Text>2 year warranty on workmanship and materials</Text>
      </View>
    ),
  },

  {
    prop: 'nbc',
    des: 'National Building Code (NBC) —— Sidewalk/ garage pad /slab',
    text: () => (
      <View
        style={{
          padding: 10,
        }}
      >
        <Text h2>National Building Code (NBC) — Sidewalk / Garage Pad / Slab</Text>
        <Text>{'\n'}{'\u2022'}Remove existing slab or concrete</Text>
        <Text>{'\u2022'} Drill 4 foot deep pilings 10 inches in diameter and a minimum of 5 foot intervals</Text>
        <Text>{'\u2022'} Install 15 mm steel rebar in centre of pilings </Text>
        <Text>{'\u2022'}Install 6" x 6" wire mesh to centre of new concrete </Text>
        <Text>{'\u2022'}Pour/place 32 mpa ready-mix concrete (4"- 8" thick)</Text>
        <Text>{'\u2022'}Float or broom finish </Text>
        <Text>20 year warranty on workmanship and materials</Text>
      </View>
    ),
  },

  {
    prop: 'concreteSteps',
    des: 'Concrete steps / landing / treads / risers',
    text: () => (
      <View
        style={{
          padding: 10,
        }}
      >
        <Text h2>Concrete Steps / Landing / Treads / Risers</Text>
        <Text>{'\n'}{'\u2022'}Remove existing landing, treads/ risers</Text>
        <Text>{'\u2022'} Drill and install 4 foot deep pilings 10 inches in diameter at a maximum of 5 foot
intervals at all grades including treads and risers</Text>
        <Text>{'\u2022'} Build footings or foundations or both (depending on design) </Text>
        <Text>{'\u2022'}Reinforce all with 15m steel rebar</Text>
        <Text>{'\u2022'}Build solid concrete or "solid" fill concrete block (size to be determined on job site)</Text>
        <Text>{'\u2022'}Slabs to be reinforced with 6"x6" steel mesh overlapped a minimum of 6" </Text>
        <Text>{'\u2022'}Pour/place 32 mpa concrete </Text>
        <Text>{'\u2022'}Float or broom finish </Text>
        <Text>20 year warranty on workmanship and materials</Text>
      </View>
    ),
  },

  {
    prop: 'concreteCare',
    des: 'Concrete Care',
    text: () => (
      <View
        style={{
          padding: 10,
        }}
      >
        <Text h2> Concrete Care </Text>
        <Text>{'\n'} We only recommend the use of coarse sand on your concrete/flagstone for winter
conditions. All other products are harmful and may cause pitting or discolouration. A
bag of coarse sand can be purchased at Home Depot. {'\n'} </Text>
        <Text> Please note: our flagstone installation/restoration has a warranty for 5 years provided
you use only sand in the winter for icy conditions. All other products cause damage to
the mortar joints. Small bags of construction sand can be purchased at Home Depot</Text>
      </View>
    ),
  },

  {
    prop: 'retaining',
    des: 'Retaining walk outs (NBC)',
    text: () => (
      <View
        style={{
          padding: 10,
        }}
      >
        <Text h2>Retaining Walk-Outs (NBC)</Text>
        <Text>{'\n'}{'\u2022'} Remove existing walk out, landscaping, decking, fence etc. (if required) and haul
away</Text>
        <Text>{'\u2022'}Drill and install 4 foot deep pilings, 10 inches in diameter at a maximum of 5 foot
intervals at all grades, including treads and risers</Text>
        <Text>{'\u2022'}Build footings</Text>
        <Text>{'\u2022'} Reinforce all with 15 mm steel rebar. (OBC says No, NBC says Yes)</Text>
        <Text>{'\u2022'} Build solid concrete or "solid" fill concrete block (size to be determined on job site)</Text>
        <Text>{'\u2022'}Drill weepers after walls are constructed OR build into wall a minimum 1/4" tubing to
be located at very bottom of wall and at 2' intervals</Text>
        <Text>{'\u2022'} Weeper locations to have 3/4" clear gravel to act as a filter from native soils to
ensure that the hydrostatic pressure is always being released, thereby taking a lot of
pressure off the wall (OBC says No, NBC says Yes)</Text>
        <Text>{'\u2022'} Cover walls with parge if block (if concrete, no parge is required)</Text>
        <Text>{'\u2022'} Backfill and compress native soils into place or backfill with HPB aggregates</Text>
      </View>
    ),
  },

  {

    prop: 'chimney',
    des: 'Chimney',
    text: () => (
      <View
        style={{
          padding: 10,
        }}
      >
        <Text h2>Chimney </Text>
        <Text>{'\n'}{'\u2022'} Dismantle chimney to roofline/foundation/top only and rebuild with new brick to
match as close as possible (no corbeling)</Text>
        <Text>{'\u2022'} Replace top glue liner(s)</Text>
        <Text h3>New Cap </Text>
        <Text>{'\u2022'} Cover walls with parge if block (if concrete, no parge is required)</Text>
        <Text>{'\u2022'} Backfill and compress native soils into place or backfill with HPB aggregates</Text>
        <Text h3>New Crown</Text>
        <Text>{'\u2022'} Install portland or type 10 mix 3-1 pre-hydrated or hydraulic mortar</Text>
        <Text>{'\u2022'}Top of crown to be sloped and feathered from 2" down to outer edge of limestone
cap{'\n'} </Text>
        <Text>{'\u2022'}Apply fire rated caulking(orange or grey colour) around all flue liners (including gas))</Text>
        <Text h3>Check Roof Flashing </Text>

        <Text>{'\u2022'} Re-attach flashing and caulk and ensure not even a pinhole exists.</Text>
        <Text>{'\u2022'} Clean roof, dismantle scaffolding, clean up little pigs mess and haul away</Text>
        <Text>10 year warranty on workmanship and materials</Text>

      </View>
    ),
  },

  {
    prop: 'refacingSlices',
    des: 'Stone Refacing Slices',
    text: () => (
      <View
        style={{
          padding: 10,
        }}
      >
        <Text h2>Stone Refacing Slices - Remove siding and/or trim work from around
windows</Text>
        <Text>{'\n'}{'\u2022'} Install minimum 3/8" to 3/4" thick plywood</Text>
        <Text>{'\u2022'} Cover new plywood with water resistant paint or primer</Text>
        <Text>{'\u2022'}Install real natural limestone 3" thick window sills complete with rock face and drip
edge</Text>
        <Text>{'\u2022'} Caulk and seal all new work where required</Text>
        <Text>10 year warranty on workmanship and materials</Text>
      </View>
    ),
  },

  {
    prop: 'refacingComplete',
    des: 'Complete Stone Refacing',
    text: () => (
      <View
        style={{
          padding: 10,
        }}
      >
        <Text h2>Complete Stone Refacing</Text>
        <Text>{'\n'}{'\u2022'} Remove and haul away existing brick if required</Text>
        <Text>{'\u2022'}Install new vapour barrier and rubber membrane flashing if required</Text>
        <Text>{'\u2022'}Install limestone address plaque</Text>
        <Text>{'\u2022'}Caulk and seal all new work where required</Text>
        <Text>10 year warranty on workmanship and materials</Text>
      </View>
    ),
  },

  {
    prop: 'coping',
    des: 'Coping Stone',
    text: () => (
      <View
        style={{
          padding: 10,
        }}
      >
        <Text h2>Coping Stone</Text>
        <Text>{'\n'}{'\u2022'}Install full length 3 inch Indiana limestone CAP (no mitred corners)</Text>
        <Text>{'\u2022'}2" overhang with drip edge cut thoroughly through stone and mortar joints from end
to end, 1/4"deep (drip edge) and 1-1.5" away from the wall</Text>
      </View>
    ),
  },
  {
    prop: 'flashing',
    des: 'Flashing/weeper/plugged weepers',
    text: () => (
      <View
        style={{
          padding: 10,
        }}
      >
        <Text h2>Flashing / Weeper / Plugged Weepers</Text>
        <Text>{'\n'}Through the wall flashing (behind the brick) and clean active weepers should be
                    located at: the top of foundation walls, all openings, and the top of all grade levels and
                    landings (in other words, whatever is exposed to the environment). {'\n'} </Text>
        <Text>Brick (masonry units) absorb water, but when it gets behind the brick (cavity) it needs
           a place to vent. This is where weepers come in, providing they are functional and are
          even present. {'\n'}</Text>

        <Text> Without weepers, or plugged weepers, water becomes trapped in the cavity and slowly
starts to erode the brick from the inside out, or worse yet, starts entering inside the
building, causing mold and other issues. {'\n'}</Text>
        <Text> We also want to protect the exterior face by applying a parge to the new masonry, to
ensure that the exterior is repelling the moisture away rather then absorbing the water
that it is usually exposed to.{'\n'}</Text>
        <Text>{'\u2022'} Remove at least 2 courses of brick</Text>
        <Text>{'\u2022'} Shore up brickwork above</Text>
        <Text>{'\u2022'} Install new flashing</Text>
        <Text>{'\u2022'} Install new brick</Text>
        <Text>{'\u2022'} Ensure weepers are installed </Text>
        <Text>{'\u2022'} Clean weepers after process</Text>
        <Text>{'\u2022'} Parge outside of new masonry (UNLESS OTHERWISE SPECIFIED)</Text>

      </View>
    ),
  },

  {
    prop: 'waterproofing',
    des: 'Exterior Waterproofing',
    text: () => (
      <View
        style={{
          padding: 10,
        }}
      >
        <Text h2>Exterior Waterproofng</Text>
        <Text>{'\n'}{'\u2022'} Excavate down to footings ensuring the width is wide enough for the safety of our
workers </Text>
        <Text>{'\u2022'} Wire brush and clean foundation wall and footing</Text>
        <Text>{'\u2022'} Repair all cracks and voids in wall by first V jointing all cracks (minimum 1" deep)
prior to installing pre-hydrated or hydraulic mortar</Text>
        <Text>{'\u2022'} Parge wall only if it is made of blocks or bricks (solid concrete okay)</Text>
        <Text>{'\u2022'} Replace weeping tile if one exists, and/or needs replacement</Text>
        <Text>{'\u2022'} Cover wall with either a trowel on liquid rubber membrane or sheets of blue skin
rubber membrane</Text>
        <Text>{'\u2022'} Backfill and compress (tamp) native soil back into place or backfill with HPB
aggregates (depending on weather and/or location)</Text>
        <Text>{'\u2022'}Concrete (Extra Work)</Text>
        <Text>{'\u2022'}Asphalt (Extra Work)</Text>
        <Text>{'\u2022'}Stone (Extra Work)</Text>
        <Text>{'\u2022'}Re-sodding and/or Interlock (Extra Work)</Text>
        <Text>20 year warranty on workmanship and materials</Text>
      </View>
    ),
  },
  {
    prop: 'tuckpoint',
    des: 'Tuckpointing',
    text: () => (
      <View
        style={{
          padding: 10,
        }}
      >
        <Text h2>Tuckpointing</Text>
        <Text>{'\n'}{'\u2022'} Grind out mortar joints to a minimum depth of 3/4 </Text>
        <Text>{'\u2022'} Using a blower remove dust from mortar joints and from face of wall</Text>
        <Text>{'\u2022'} Slick in with pre-hydrated mortar</Text>
        <Text>{'\u2022'} Clean up and remove debris from site</Text>
        <Text>10 year warranty on workmanship and materials</Text>
      </View>
    ),
  },
  {
    prop: 'flagstone',
    des: 'Flagstone',
    text: () => (
      <View
        style={{
          padding: 10,
        }}
      >
        <Text h2>Flagstone</Text>
        <Text>{'\n'}{'\u2022'}We install Banas stone, sandstone, natural stone or limestone</Text>
        <Text>{'\u2022'}Square cut</Text>
        <Text>{'\u2022'}Full piece treads (as few mortar joints as possible on coping area)</Text>
        <Text>{'\u2022'} Overhang with drip edges</Text>
      </View>
    ),
  },

  {
    prop: 'fwarranty',
    des: 'Flagstone Warrany',
    text: () => (
      <View
        style={{
          padding: 10,
        }}
      >
        <Text>{'\n'}FLAGSTONE WARRANTY: Our flagstone installation has a warranty for 5 years provided
you use only sand in the winter for icy conditions. All other products cause damage to
the mortar joints. Small bags of construction sand can be purchased at Home Depot. {'\n'} </Text>
      </View>
    ),
  },

  {
    prop: 'pwarranty',
    des: 'Parging Warranty',
    text: () => (
      <View
        style={{
          padding: 10,
        }}
      >
        <Text> PARGING & COATING WARRANTY: Our parging and coating have a 5 year warranty
provided you use only sand in the winter for icy conditions. All other products cause
damage to concrete, parge and coatings. Small bags of construction sand can be
purchased at Home Depot.</Text>
      </View>
    ),
  },

  {
    prop: 'disclaimerA',
    des: 'Disclaimer A',
    text: () => (
      <View
        style={{
          padding: 10,
        }}
      >
        <Text> Please Note: Additional work outside of the estimate to be assessed and discussed onsite with customer</Text>
      </View>
    ),
  },
  {
    prop: 'tuckpointUniform',
    des: 'Tuckpoint Uniform',
    text: () => (
      <View
        style={{
          padding: 10,
        }}
      >
        <Text> For uniformity to the look and long term weather proofing of your masonry we
recommend you consider Tuckpointing complete elevations rather than patch repairs.
This should also include RGP parge minimum 8" from grade around property where
accessible.</Text>

      </View>
    ),
  },
  {
    prop: 'surveyInvite',
    des: 'Survey Invite',
    text: () => (
      <View
        style={{
          padding: 10,
        }}
      >
        <Text> If you are interested in using our services we can arrange for one of our surveyors to
visit your property. Estimate may change as a result of the survey.</Text>
      </View>
    ),
  },
  {
    prop: 'surveyInviteDave',
    des: 'Survey Invite Dave',
    text: () => (
      <View
        style={{
          padding: 10,
        }}
      >
        <Text > If you are interested in using our services a further site visit will be required from the
owner David Fritz to discuss details etc. Estimate may change as a result of this
consultation</Text>
      </View>
    ),
  },
  {
    prop: 'customerClean',
    des: 'Customer Clean',
    text: () => (
      <View
        style={{
          padding: 10,
        }}
      >
        <Text>Customer to arrange timber decking/handrails etc. to be removed before our work begins and re-installed after our work is done.</Text>
        <Text>{'\n'} {'\n'} </Text>
      </View>
    ),
  },
  {
    prop: 'existingConcrete',
    des: 'Existing Concrete',
    text: () => (
      <View
        style={{
          padding: 10,
        }}
      >
        <Text> Your existing concrete porch steps/landing show signs of moving so are not structurally solid. Any stones you put on its surface will not last as the movement will break the mortar joints between the stones. Without continually filling these joints, water will get in the broken joints, will freeze, expand, and accelerate the rate of damage</Text>
        <Text>{'\n'} {'\n'} </Text>
      </View>
    ),
  },
];

generics = generics.sort((a, b) => {
  const textA = a.des.toUpperCase();
  const textB = b.des.toUpperCase();
  return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
});
export default generics;
