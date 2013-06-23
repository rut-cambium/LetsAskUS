#import "stopCamera.h"
#import <Cordova/CDV.h>

@implementation StopCamera

- (void)stop:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    NSString* echo = [command.arguments objectAtIndex:0];
    
    [NSNotificationCenter defaultCenter];
    if([echo isEqualToString:@"stop"])
    {
        NSNotification* notification = [NSNotification notificationWithName:@"StopCamera" object:self];
        [[NSNotificationCenter defaultCenter] postNotification:notification];
    }
    else
    {
        NSNotification* notification = [NSNotification notificationWithName:@"StartCamera" object:self];
        [[NSNotificationCenter defaultCenter] postNotification:notification];
    }
       
    if (echo != nil && [echo length] > 0) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:echo];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end