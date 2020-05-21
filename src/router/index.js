import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/home/home'
import MeetDrIraGoldberg from '@/pages/meet-dr-ira-goldberg/meet-dr-ira-goldberg'
import MeetTheTeam from '@/pages/meet-the-team/meet-the-team'
import AboCertification from '@/pages/abo-certification/abo-certification'
import WhatSetsUsApart from '@/pages/what-sets-us-apart/what-sets-us-apart'
import OfficeVisits from '@/pages/office-visits/office-visits'
import FinancialInformation from '@/pages/financial-information/financial-information'
import Testimonials from '@/pages/testimonials/testimonials'
import BeforeAndAfter from '@/pages/before-and-after/before-and-after'
import OfficeTour from '@/pages/office-tour/office-tour'
import PatientForms from '@/pages/patient-forms/patient-forms'
import AboutOrthodontics from '@/pages/about-orthodontics/about-orthodontics'
import ForAllAges from '@/pages/for-all-ages/for-all-ages'
import TwoPhaseTreatment from '@/pages/two-phase-treatment/two-phase-treatment'
import PalatalExpander from '@/pages/palatal-expander/palatal-expander'
import BrushingAndFlossing from '@/pages/brushing-and-flossing/brushing-and-flossing'
import SurgicalOrthodontics from '@/pages/surgical-orthodontics/surgical-orthodontics'
import DentofacialOrthopedics from '@/pages/dentofacial-orthopedics/dentofacial-orthopedics'
import Incognito from '@/pages/incognito/incognito'
import ClarityAdvancedCeramicBrackets from '@/pages/clarity-advanced-ceramic-brackets/clarity-advanced-ceramic-brackets'
import AcceledentAura from '@/pages/acceledent-aura/acceledent-aura'
import DamonSmile from '@/pages/damon-smile/damon-smile'
import DamonClear from '@/pages/damon-clear/damon-clear'
import IteroElement from '@/pages/itero-element/itero-element'
import Tads from '@/pages/tads/tads'
import InvisalignTreatment from '@/pages/invisalign-treatment/invisalign-treatment'
import InvisalignTreatmentForTeens from '@/pages/invisalign-treatment-for-teens/invisalign-treatment-for-teens'
import RoslynOfficeLocation from '@/pages/roslyn-office-location/roslyn-office-location'
import AppointmentRequest from '@/pages/appointment-request/appointment-request'
import PostAppointmentSurvey from '@/pages/post-appointment-survey/post-appointment-survey'
import Sitemap from '@/pages/sitemap/sitemap'
import ThankYou from '@/pages/thank-you/thank-you'
import scrollBehavior from '@/shared/functionality/scroll-behavior'
import Styleguide from '@/styleguide/styleguide'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      navigation: true,
      component: Home
    },
    {
      path: '/meet-dr-ira-goldberg',
      name: 'meet-dr-ira-goldberg',
      navigation: true,
      component: MeetDrIraGoldberg
    },
    {
      path: '/meet-the-team',
      name: 'meet-the-team',
      navigation: true,
      component: MeetTheTeam
    },
    {
      path: '/abo-certification',
      name: 'abo-certification',
      navigation: true,
      component: AboCertification
    },
    {
      path: '/what-sets-us-apart',
      name: 'what-sets-us-apart',
      navigation: true,
      component: WhatSetsUsApart
    },
    {
      path: '/office-visits',
      name: 'office-visits',
      navigation: true,
      component: OfficeVisits
    },
    {
      path: '/financial-information',
      name: 'financial-information',
      navigation: true,
      component: FinancialInformation
    },
    {
      path: '/testimonials',
      name: 'testimonials',
      navigation: true,
      component: Testimonials
    },
    {
      path: '/before-and-after',
      name: 'before-and-after',
      navigation: true,
      component: BeforeAndAfter
    },
    {
      path: '/office-tour',
      name: 'office-tour',
      navigation: true,
      component: OfficeTour
    },
    {
      path: '/patient-forms',
      name: 'patient-forms',
      navigation: true,
      component: PatientForms
    },
    {
      path: '/about-orthodontics',
      name: 'about-orthodontics',
      navigation: true,
      component: AboutOrthodontics
    },
    {
      path: '/for-all-ages',
      name: 'for-all-ages',
      navigation: true,
      component: ForAllAges
    },
    {
      path: '/two-phase-treatment',
      name: 'two-phase-treatment',
      navigation: true,
      component: TwoPhaseTreatment
    },
    {
      path: '/palatal-expander',
      name: 'palatal-expander',
      navigation: true,
      component: PalatalExpander
    },
    {
      path: '/brushing-and-flossing',
      name: 'brushing-and-flossing',
      navigation: true,
      component: BrushingAndFlossing
    },
    {
      path: '/surgical-orthodontics',
      name: 'surgical-orthodontics',
      navigation: true,
      component: SurgicalOrthodontics
    },
    {
      path: '/dentofacial-orthopedics',
      name: 'dentofacial-orthopedics',
      navigation: true,
      component: DentofacialOrthopedics
    },
    {
      path: '/incognito',
      name: 'incognito',
      navigation: true,
      component: Incognito
    },
    {
      path: '/clarity-advanced-ceramic-brackets',
      name: 'clarity-advanced-ceramic-brackets',
      navigation: true,
      component: ClarityAdvancedCeramicBrackets
    },
    {
      path: '/acceledent-aura',
      name: 'acceledent-aura',
      navigation: true,
      component: AcceledentAura
    },
    {
      path: '/damon-smile',
      name: 'damon-smile',
      navigation: true,
      component: DamonSmile
    },
    {
      path: '/damon-clear',
      name: 'damon-clear',
      navigation: true,
      component: DamonClear
    },
    {
      path: '/itero-element',
      name: 'itero-element',
      navigation: true,
      component: IteroElement
    },
    {
      path: '/tads',
      name: 'tads',
      navigation: true,
      component: Tads
    },
    {
      path: '/invisalign-treatment',
      name: 'invisalign-treatment',
      navigation: true,
      component: InvisalignTreatment
    },
    {
      path: '/invisalign-treatment-for-teens',
      name: 'invisalign-treatment-for-teens',
      navigation: true,
      component: InvisalignTreatmentForTeens
    },
    {
      path: '/roslyn-office-location',
      name: 'roslyn-office-location',
      navigation: true,
      component: RoslynOfficeLocation
    },
    {
      path: '/appointment-request',
      name: 'appointment-request',
      navigation: true,
      component: AppointmentRequest
    },
    {
      path: 'https://pplpractice-reviews.com/GolRoslyn',
      name: 'post-appointment-survey',
      navigation: true,
      component: PostAppointmentSurvey
    },
    {
      path: '/sitemap',
      name: 'sitemap',
      navigation: false,
      component: Sitemap
    },
    {
      path: '/thank-you',
      name: 'thank-you',
      navigation: false,
      component: ThankYou
    },
    {
      path: '/styleguide',
      name: 'Styleguide',
      navigation: false,
      component: Styleguide
    },
    {
      path: '/*',
      name: 'page-not-found',
      navigation: false,
      component: Home
    }
  ],
  scrollBehavior
})

export default router
