import { ResetValue } from "../common/options";
import { Expression } from "firebase-functions/params";
import { WireParamSpec, SecretParam } from "../params/types";
/**
 * A definition of an extension as appears in the Manifest.
 * Exactly one of ref or localPath must be present.
 */
export interface ManifestExtension {
    params: Record<string, string | SecretParam>;
    ref?: string;
    localPath?: string;
    events: string[];
}
/**
 * A definition of a function as appears in the Manifest.
 *
 * @alpha
 */
export interface ManifestEndpoint {
    entryPoint?: string;
    region?: string[];
    omit?: boolean | Expression<boolean>;
    platform?: string;
    availableMemoryMb?: number | Expression<number> | ResetValue;
    maxInstances?: number | Expression<number> | ResetValue;
    minInstances?: number | Expression<number> | ResetValue;
    concurrency?: number | Expression<number> | ResetValue;
    timeoutSeconds?: number | Expression<number> | ResetValue;
    vpc?: {
        connector: string | Expression<string>;
        egressSettings?: string | Expression<string> | ResetValue;
    } | ResetValue;
    serviceAccountEmail?: string | Expression<string> | ResetValue;
    cpu?: number | "gcf_gen1";
    labels?: Record<string, string>;
    ingressSettings?: string | Expression<string> | ResetValue;
    environmentVariables?: Record<string, string>;
    secretEnvironmentVariables?: Array<{
        key: string;
        secret?: string;
    }>;
    httpsTrigger?: {
        invoker?: string[];
    };
    callableTrigger?: Record<string, never>;
    eventTrigger?: {
        eventFilters: Record<string, string | Expression<string>>;
        eventFilterPathPatterns?: Record<string, string | Expression<string>>;
        channel?: string;
        eventType: string;
        retry: boolean | Expression<boolean> | ResetValue;
        region?: string;
        serviceAccountEmail?: string | ResetValue;
    };
    taskQueueTrigger?: {
        retryConfig?: {
            maxAttempts?: number | Expression<number> | ResetValue;
            maxRetrySeconds?: number | Expression<number> | ResetValue;
            maxBackoffSeconds?: number | Expression<number> | ResetValue;
            maxDoublings?: number | Expression<number> | ResetValue;
            minBackoffSeconds?: number | Expression<number> | ResetValue;
        };
        rateLimits?: {
            maxConcurrentDispatches?: number | Expression<number> | ResetValue;
            maxDispatchesPerSecond?: number | Expression<number> | ResetValue;
        };
    };
    scheduleTrigger?: {
        schedule: string | Expression<string>;
        timeZone?: string | Expression<string> | ResetValue;
        retryConfig?: {
            retryCount?: number | Expression<number> | ResetValue;
            maxRetrySeconds?: string | Expression<string> | ResetValue;
            minBackoffSeconds?: string | Expression<string> | ResetValue;
            maxBackoffSeconds?: string | Expression<string> | ResetValue;
            maxDoublings?: number | Expression<number> | ResetValue;
            maxRetryDuration?: string | Expression<string> | ResetValue;
            minBackoffDuration?: string | Expression<string> | ResetValue;
            maxBackoffDuration?: string | Expression<string> | ResetValue;
        };
    };
    blockingTrigger?: {
        eventType: string;
        options?: Record<string, unknown>;
    };
}
/**
 * Description of API required for this stack.
 * @alpha
 */
export interface ManifestRequiredAPI {
    api: string;
    reason: string;
}
/**
 * A definition of a function/extension deployment as appears in the Manifest.
 *
 * @alpha
 */
export interface ManifestStack {
    specVersion: "v1alpha1";
    params?: WireParamSpec<any>[];
    requiredAPIs: ManifestRequiredAPI[];
    endpoints: Record<string, ManifestEndpoint>;
    extensions?: Record<string, ManifestExtension>;
}
/**
 * Returns the JSON representation of a ManifestStack, which has CEL
 * expressions in its options as object types, with its expressions
 * transformed into the actual CEL strings.
 *
 * @alpha
 */
export declare function stackToWire(stack: ManifestStack): Record<string, unknown>;
