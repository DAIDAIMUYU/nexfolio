# Tavern Package

Tavern is isolated from the NexFolio main site so it can evolve as a standalone roleplay/chat application later.

Current status:

- Source code lives in `packages/tavern/src/roleplay`.
- Product notes live in `packages/tavern/docs/roleplay-tavern`.
- NexFolio no longer imports Tavern code or exposes `/roleplay` from the main route tree.
- A separate app shell and deployment pipeline can be added here when Tavern is ready to ship independently.
