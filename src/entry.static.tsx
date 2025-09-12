/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for the static site generation (SSG) during the production build.
 */
import {
  createQwikCity,
  type PlatformNode,
} from '@builder.io/qwik-city/middleware/node';
import qwikCityPlan from '@qwik-city-plan';
import { manifest } from '@qwik-client-manifest';
import render from './entry.ssr';

declare global {
  interface QwikCityPlatform extends PlatformNode {}
}

const { router, notFound } = createQwikCity({ render, qwikCityPlan, manifest });

export { router, notFound };



