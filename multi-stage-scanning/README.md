# Multi-Stage Scanning Example

This example demonstrates a multi-stage Docker build with integrated security scanning.

## Security Scanning: Microscanner → Trivy Migration

**⚠️ Important Update:** This example has been updated to use Trivy instead of the deprecated Aqua Microscanner.

### Why the Change?

- **Aqua Microscanner** has been deprecated for several years
- **Trivy** is the modern replacement and actively maintained successor
- Trivy provides better vulnerability detection and performance

### What Changed

The security scanning stage (Stage 5) now uses:
- ✅ **Trivy**: Modern, fast, and comprehensive vulnerability scanner
- ❌ ~~Microscanner~~: Deprecated and no longer maintained

### Using This Example

1. **Build the image:**
   ```bash
   docker build -t scanning-example .
   ```

2. **Build specific stages:**
   ```bash
   # Build and run security scan
   docker build --target audit -t scanning-example:audit .
   
   # Build production image
   docker build --target prod -t scanning-example:prod .
   ```

3. **Run in development:**
   ```bash
   docker-compose up
   ```

### Note

This example uses Node.js 10 which may have compatibility issues with newer package-lock.json formats. Consider updating to a more recent Node.js version for production use.

### Learn More

- [Trivy Documentation](https://aquasecurity.github.io/trivy/)
- [Docker Multi-Stage Builds](https://docs.docker.com/develop/dev-best-practices/dockerfile_best-practices/#use-multi-stage-builds)