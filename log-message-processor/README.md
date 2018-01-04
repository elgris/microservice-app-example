# log-message-processor
This service is written in Python3. This is a simple consumer that listens for
new messages in Redis queue and prints message content to stdout. Message can be
anything, there is no additional processing.

## Configuration

The service scans environment for variables:
- `REDIS_HOST` - host of Redis
- `REDIS_PORT` - port of Redis
- `REDIS_CHANNEL` - channel the processor is going to listen to

## Building and running

```
pip3 install -r requirements.txt
REDIS_HOST=127.0.0.1 REDIS_PORT=6379 REDIS_CHANNEL=log_channel python3 main.py
```