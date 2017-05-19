const generics = [
  {
    prop: 'watertest',
    des: 'Waterproof Test',
  },
  {
    prop: 'sills',
    des: 'Stone WindowSills',
  },
  {
    prop: 'pargeex',
    des: 'Repair, Grind & Parge',
  },
  {
    prop: 'obc',
    des: 'Ontario Building Code (OBC)—— Sidewalk/ garage pad /slab',
  },
  {
    prop: 'nbc',
    des: 'National Building Code (NBC) —— Sidewalk/ garage pad /slab',
  },
  {
    prop: 'concreteSteps',
    des: 'Concrete steps / landing / treads / risers',
  },
  {
    prop: 'concreteCare',
    des: 'Concrete Care',
  },
  {
    prop: 'retaining',
    des: 'Retaining walk outs (NBC)',
  },
  {
    prop: 'chimney',
    des: 'Chimney',
  },
  {
    prop: 'refacingSlices',
    des: 'Stone Refacing Slices',
  },
  {
    prop: 'refacingComplete',
    des: 'Complete Stone Refacing',
  },
  {
    prop: 'coping',
    des: 'Coping Stone',
  },
  {
    prop: 'flashing',
    des: 'Flashing/weeper/plugged weepers',
  },
  {
    prop: 'waterproofing',
    des: 'Exterior Waterproofing',
  },
  {
    prop: 'tuckpoint',
    des: 'Tuckpointing',
  },
  {
    prop: 'flagstone',
    des: 'Flagstone',
  },
  {
    prop: 'fwarranty',
    des: 'Flagstone Warrany',
  },
  {
    prop: 'pwarranty',
    des: 'Parging Warranty',
  },

  {
    prop: 'disclaimerA',
    des: 'Disclaimer A',
  },
  {
    prop: 'disclaimerB',
    des: 'Disclaimer B',
  },
  {
    prop: 'disclaimerAB',
    des: 'Disclaimer AB',
  },
  {
    prop: 'tuckpointUniform',
    des: 'Tuckpoint Uniform',
  },
  {
    prop: 'surveyInvite',
    des: 'Survey Invite',
  },
  {
    prop: 'surveyInviteDave',
    des: 'Survey Invite Dave',
  },
  {
    prop: 'customerClean',
    des: 'Customer Clean',
  },
  {
    prop: 'existingConcrete',
    des: 'Existing Concrete',
  },

];

  generics = generics.sort(function(a, b) {
    var textA = a.prop.toUpperCase();
    var textB = b.prop.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
});
export default generics;
